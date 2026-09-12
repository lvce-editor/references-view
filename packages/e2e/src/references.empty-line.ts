import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'references.empty-line'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, Locator, Main }) => {
  // arrange
  const url = import.meta.resolve('../.tmp/sample.reference-provider-advanced').toString()
  await Extension.addWebExtension(url)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/empty-line.xyz`, 'const value = 1\n\n')
  await Main.openUri(`${tmpDir}/empty-line.xyz`)
  await Editor.setCursor(0, 0)
  await Editor.findAllReferences()

  // assert
  const label = Locator('.LocationList .Label')
  await expect(label).toHaveText('(empty line)')
  const highlights = label.locator('.Highlight')
  await expect(highlights).toHaveCount(0)
}
