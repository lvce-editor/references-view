import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'references.collapse-all-preserves-message'

export const test: Test = async ({ Command, Editor, expect, Extension, FileSystem, Locator, Main }) => {
  // arrange
  const url = import.meta.resolve('../fixtures/sample.reference-provider-advanced').toString()
  await Extension.addWebExtension(url)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/multiple-files.xyz`, 'first()\n')
  await FileSystem.writeFile(`${tmpDir}/other.xyz`, 'second()\n')
  await Main.openUri(`${tmpDir}/multiple-files.xyz`)
  await Editor.setCursor(0, 0)
  await Editor.findAllReferences()
  const items = Locator('.LocationList .TreeItem')
  await expect(items).toHaveCount(4)

  // act
  await Command.execute('References.collapseAll')

  // assert
  const message = Locator('.LocationsMessage')
  const firstFileItem = items.nth(0)
  const secondFileItem = items.nth(1)
  await expect(message).toHaveText('2 results in 2 files')
  await expect(items).toHaveCount(2)
  await expect(firstFileItem).toHaveText('multiple-files.xyz')
  await expect(secondFileItem).toHaveText('other.xyz')
}
