import { cp, mkdir, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const fixturesRoot = join(packageRoot, 'fixtures')
const outputRoot = join(packageRoot, '.tmp')

const prepareFixture = async (name, bundle = true) => {
  const sourceDirectory = join(fixturesRoot, name)
  const outputDirectory = join(outputRoot, name)
  await mkdir(outputDirectory, { recursive: true })
  await cp(join(sourceDirectory, 'extension.json'), join(outputDirectory, 'extension.json'))
  if (!bundle) {
    return
  }
  await build({
    bundle: true,
    entryPoints: [join(sourceDirectory, 'main.js')],
    external: ['electron', 'node:*'],
    format: 'esm',
    outfile: join(outputDirectory, 'main.js'),
    platform: 'browser',
  })
}

await rm(outputRoot, { force: true, recursive: true })
await Promise.all([
  prepareFixture('sample.reference-provider-basic'),
  prepareFixture('sample.reference-provider-error'),
  prepareFixture('sample.reference-provider-error-main-not-found', false),
  prepareFixture('sample.reference-provider-no-results'),
])
