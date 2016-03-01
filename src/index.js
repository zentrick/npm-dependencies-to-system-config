import listNpmDependencies from 'list-npm-dependencies'
import slash from 'slash'

const mapPackageDependencies = (dependencies, packages, map) => {
  for (const dep of Object.keys(dependencies)) {
    const version = dependencies[dep]
    map[dep] = slash(packages[`${dep}@${version}`].path)
  }
}

export default async (pkgRoot, options) => {
  const { root, packages } = await listNpmDependencies(pkgRoot, options)

  const config = {
    map: {},
    packages: {}
  }

  mapPackageDependencies(root.dependencies, packages, config.map)

  for (const nameVersion of Object.keys(packages)) {
    const pkgMeta = packages[nameVersion]
    const map = {}

    mapPackageDependencies(pkgMeta.dependencies, packages, map)

    config.packages[slash(pkgMeta.path)] = {
      main: pkgMeta.browser || pkgMeta.main || 'index.js',
      map
    }
  }

  return config
}
