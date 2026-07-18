import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'references.actions'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, Locator, Main }) => {
  // arrange
  const url = import.meta.resolve('../fixtures/sample.reference-provider-advanced').toString()
  await Extension.addWebExtension(url)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/actions.xyz`, 'const value = 1\n')
  await Main.openUri(`${tmpDir}/actions.xyz`)
  await Editor.setCursor(0, 0)
  await Editor.findAllReferences()

  // assert
  const actions = Locator('.SideBar .Actions')
  const buttons = actions.locator('button.IconButton')
  const refreshButton = buttons.nth(0)
  const clearButton = buttons.nth(1)
  const collapseAllButton = buttons.nth(2)
  await expect(buttons).toHaveCount(3)
  await expect(refreshButton).toHaveAttribute('data-command', 'refresh')
  await expect(refreshButton).toHaveAttribute('title', 'Refresh')
  await expect(clearButton).toHaveAttribute('data-command', 'clear')
  await expect(clearButton).toHaveAttribute('title', 'Clear')
  await expect(collapseAllButton).toHaveAttribute('data-command', 'collapseAll')
  await expect(collapseAllButton).toHaveAttribute('title', 'Collapse All')
}
