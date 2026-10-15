import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'references.definition-provider'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, Locator, Main }) => {
  // arrange
  const url = import.meta.resolve('../.tmp/sample.definition-provider-only').toString()
  await Extension.addWebExtension(url)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.xyz`, 'let add = () => {}\n\nadd(1, 2)\n')
  await Main.openUri(`${tmpDir}/test.xyz`)
  await Editor.setCursor(2, 2)

  // act
  await Editor.findAllReferences()

  // assert
  const locations = Locator('.Locations')
  await expect(locations).toBeVisible()
  const message = Locator('.LocationsMessage')
  await expect(message).toHaveText('1 result in 1 file')
  const items = locations.locator('.TreeItem')
  await expect(items).toHaveCount(2)
  const declaration = items.nth(1)
  await expect(declaration).toHaveText('let add = () => {}')
}
