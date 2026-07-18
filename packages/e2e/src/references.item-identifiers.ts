import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'references.item-identifiers'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, Locator, Main }) => {
  // arrange
  const url = import.meta.resolve('../fixtures/sample.reference-provider-advanced').toString()
  await Extension.addWebExtension(url)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/identifiers.xyz`, 'const value = 1\n')
  await Main.openUri(`${tmpDir}/identifiers.xyz`)
  await Editor.setCursor(0, 0)
  await Editor.findAllReferences()

  // assert
  const items = Locator('.LocationList .TreeItem')
  const fileItem = items.nth(0)
  const referenceItem = items.nth(1)
  await expect(items).toHaveCount(2)
  await expect(fileItem).toHaveAttribute('data-index', '0')
  await expect(fileItem).toHaveAttribute('id', 'Reference-0')
  await expect(referenceItem).toHaveAttribute('data-index', '1')
  await expect(referenceItem).toHaveAttribute('id', 'Reference-1')
}
