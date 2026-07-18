import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'references.multiple-results-multiple-files'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, Locator, Main }) => {
  // arrange
  const url = import.meta.resolve('../fixtures/sample.reference-provider-advanced').toString()
  await Extension.addWebExtension(url)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/multiple-files.xyz`, 'first()\n')
  await FileSystem.writeFile(`${tmpDir}/other.xyz`, 'second()\n')
  await Main.openUri(`${tmpDir}/multiple-files.xyz`)
  await Editor.setCursor(0, 0)
  await Editor.findAllReferences()

  // assert
  const message = Locator('.LocationsMessage')
  await expect(message).toHaveText('2 results in 2 files')
  const items = Locator('.LocationList .TreeItem')
  const firstFileItem = items.nth(0)
  const firstReferenceItem = items.nth(1)
  const secondFileItem = items.nth(2)
  const secondReferenceItem = items.nth(3)
  await expect(items).toHaveCount(4)
  await expect(firstFileItem).toHaveText('multiple-files.xyz')
  await expect(firstReferenceItem).toHaveText('first()')
  await expect(secondFileItem).toHaveText('other.xyz')
  await expect(secondReferenceItem).toHaveText('second()')
}
