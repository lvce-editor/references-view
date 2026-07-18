import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'references.accessibility'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, Locator, Main }) => {
  // arrange
  const url = import.meta.resolve('../.tmp/sample.reference-provider-advanced').toString()
  await Extension.addWebExtension(url)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/accessibility.xyz`, 'const value = 1\n')
  await Main.openUri(`${tmpDir}/accessibility.xyz`)
  await Editor.setCursor(0, 0)
  await Editor.findAllReferences()

  // assert
  const message = Locator('.LocationsMessage')
  await expect(message).toHaveAttribute('id', 'LocationsMessage')
  await expect(message).toHaveAttribute('role', 'status')
  const tree = Locator('.LocationList')
  await expect(tree).toHaveAttribute('aria-label', 'Locations')
  await expect(tree).toHaveAttribute('role', 'tree')
  await expect(tree).toHaveAttribute('tabindex', '0')
  const items = tree.locator('.TreeItem')
  const fileItem = items.nth(0)
  const referenceItem = items.nth(1)
  await expect(fileItem).toHaveAttribute('aria-expanded', 'true')
  await expect(fileItem).toHaveAttribute('role', 'treeitem')
  await expect(referenceItem).toHaveAttribute('aria-expanded', null)
  await expect(referenceItem).toHaveAttribute('role', 'treeitem')
}
