import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'references.multiple-results-one-file'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, Locator, Main }) => {
  // arrange
  const url = import.meta.resolve('../.tmp/sample.reference-provider-advanced').toString()
  await Extension.addWebExtension(url)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/multiple-results.xyz`, 'first()\nsecond()\n')
  await Main.openUri(`${tmpDir}/multiple-results.xyz`)
  await Editor.setCursor(0, 0)
  await Editor.findAllReferences()

  // assert
  const message = Locator('.LocationsMessage')
  await expect(message).toHaveText('2 results in 1 file')
  const items = Locator('.LocationList .TreeItem')
  const fileItem = items.nth(0)
  const firstReferenceItem = items.nth(1)
  const secondReferenceItem = items.nth(2)
  await expect(items).toHaveCount(3)
  await expect(fileItem).toHaveText('multiple-results.xyz')
  await expect(firstReferenceItem).toHaveText('first()')
  await expect(secondReferenceItem).toHaveText('second()')
}
