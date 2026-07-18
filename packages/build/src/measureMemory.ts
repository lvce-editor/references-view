import { measureMemory } from '@lvce-editor/measure-memory'
import { join } from 'node:path'
import { root } from './root.js'

const threshold = 460_000

const instantiations = 2000

const instantiationsPath = join(root, 'packages', 'references-view')

const workerPath = join(root, '.tmp/dist/dist/referencesViewWorkerMain.js')

const playwrightPath = import.meta.resolve('../../../node_modules/playwright/index.mjs')

await measureMemory({
  playwrightPath,
  workerPath,
  threshold,
  instantiations,
  instantiationsPath,
})
