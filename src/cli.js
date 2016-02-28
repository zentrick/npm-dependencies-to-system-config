#!/usr/bin/env node

import npmDependenciesToSystemConfig from './'

(async () => {
  const config = await npmDependenciesToSystemConfig(process.cwd())
  console.info(JSON.stringify(config, null, 2))
})().catch((err) => console.error(err))
