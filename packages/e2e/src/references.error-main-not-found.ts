import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'references.error-main-not-found'

export const test: Test = async ({ Extension, FileSystem, Main, Editor, Locator, expect }) => {
  // arrange
  const url = import.meta.resolve('../fixtures/sample.reference-provider-error-main-not-found').toString()
  await Extension.addWebExtension(url)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/add.xyz`,
    `export const add = () => {}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/test.xyz`,
    `import { add } from './not-found.xyz'

add(1,2)
`,
  )
  await Main.openUri(`${tmpDir}/test.xyz`)
  await Editor.setCursor(2, 2)

  // act
  await Editor.findAllReferences()

  // assert
  const viewletError = Locator('.Viewlet.Error')

  await expect(viewletError).toBeVisible()
  await expect(viewletError).toHaveText(
    `Error: Failed to activate extension sample.reference-provider-error-main-not-found: Failed to import ${url}/not-found.js: Not found (404)`,
  ) // TODO
}
