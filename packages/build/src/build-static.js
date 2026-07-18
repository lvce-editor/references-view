import { cp } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root } from './root.js'

const sharedProcessPath = join(root, 'node_modules', '@lvce-editor', 'shared-process', 'index.js')

const sharedProcessUrl = pathToFileURL(sharedProcessPath).toString()

const sharedProcess = await import(sharedProcessUrl)

process.env.PATH_PREFIX = '/references-view'
const { commitHash } = await sharedProcess.exportStatic({
  root,
  extensionPath: '',
})

const workerPath = join(root, '.tmp/dist/dist/referencesViewWorkerMain.js')
const staticWorkerPath = join(root, 'dist', commitHash, 'packages', 'references-view', 'dist', 'referencesViewWorkerMain.js')
await cp(workerPath, staticWorkerPath)

await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
