import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'references.no-provider'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, Locator, Main }) => {
  // arrange
  const url = import.meta.resolve('../.tmp/sample.language-xyz').toString()
  await Extension.addWebExtension(url)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/add.xyz`,
    `export const add = () => {}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/test.xyz`,
    `import { add } from './add.ts'

add(1,2)
`,
  )
  await Main.openUri(`${tmpDir}/test.xyz`)
  await Editor.setCursor(1, 0)

  // act
  await Editor.findAllReferences()

  // assert
  const viewletError = Locator('.Viewlet.Error')
  await expect(viewletError).toBeVisible()
  await expect(viewletError).toHaveText('Error: No reference provider found for xyz')
}
