import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'references.highlight'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, Locator, Main }) => {
  // arrange
  const url = import.meta.resolve('../.tmp/sample.reference-provider-advanced').toString()
  await Extension.addWebExtension(url)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/highlight.xyz`, 'const target = 1\n')
  await Main.openUri(`${tmpDir}/highlight.xyz`)
  await Editor.setCursor(0, 0)
  await Editor.findAllReferences()

  // assert
  const label = Locator('.LocationList .Label')
  await expect(label).toHaveText('const target = 1')
  const highlight = label.locator('.Highlight')
  await expect(highlight).toHaveCount(1)
  await expect(highlight).toHaveText('target')
}
