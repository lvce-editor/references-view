import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'references.preview-trims-whitespace'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, Locator, Main }) => {
  // arrange
  const url = import.meta.resolve('../fixtures/sample.reference-provider-advanced').toString()
  await Extension.addWebExtension(url)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/whitespace.xyz`, '    const value = 1    \n')
  await Main.openUri(`${tmpDir}/whitespace.xyz`)
  await Editor.setCursor(0, 0)
  await Editor.findAllReferences()

  // assert
  const label = Locator('.LocationList .Label')
  await expect(label).toHaveText('const value = 1')
}
