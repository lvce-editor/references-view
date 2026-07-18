import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'references.clear-removes-items'

export const test: Test = async ({ Command, Editor, expect, Extension, FileSystem, Locator, Main }) => {
  // arrange
  const url = import.meta.resolve('../fixtures/sample.reference-provider-advanced').toString()
  await Extension.addWebExtension(url)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/clear-results.xyz`, 'const value = 1\n')
  await Main.openUri(`${tmpDir}/clear-results.xyz`)
  await Editor.setCursor(0, 0)
  await Editor.findAllReferences()
  const items = Locator('.LocationList .TreeItem')
  await expect(items).toHaveCount(2)

  // act
  await Command.execute('References.clear')

  // assert
  const message = Locator('.LocationsMessage')
  await expect(message).toHaveText('No Results')
  await expect(items).toHaveCount(0)
}
