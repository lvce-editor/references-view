import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'references.file-label'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, Locator, Main }) => {
  // arrange
  const url = import.meta.resolve('../.tmp/sample.reference-provider-advanced').toString()
  await Extension.addWebExtension(url)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/descriptive-reference-name.xyz`, 'const value = 1\n')
  await Main.openUri(`${tmpDir}/descriptive-reference-name.xyz`)
  await Editor.setCursor(0, 0)
  await Editor.findAllReferences()

  // assert
  const fileItem = Locator('.LocationList .TreeItem').nth(0)
  await expect(fileItem).toHaveText('descriptive-reference-name.xyz')
  await expect(fileItem.locator('.FileIcon')).toHaveCount(1)
}
