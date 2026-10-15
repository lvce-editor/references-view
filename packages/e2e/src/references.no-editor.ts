import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'references.no-editor'

export const test: Test = async ({ Command, Editor, expect, Extension, FileSystem, Locator, Main }) => {
  // arrange
  await Command.execute('Layout.openSideBarViewlet', 'References')

  // assert
  const message = Locator('.LocationsMessage')
  const refreshButton = Locator('button[data-command="refresh"]')
  const clearButton = Locator('button[data-command="clear"]')
  const collapseAllButton = Locator('button[data-command="collapseAll"]')
  await expect(message).toHaveText('No Editor found')
  await expect(refreshButton).toHaveCount(1)
  await expect(clearButton).toHaveCount(1)
  await expect(collapseAllButton).toHaveCount(1)
  await expect(refreshButton).toHaveJSProperty('disabled', true)
  await expect(clearButton).toHaveJSProperty('disabled', true)
  await expect(collapseAllButton).toHaveJSProperty('disabled', true)

  // Reopening References with an editor enables actions even with no results.
  const url = import.meta.resolve('../.tmp/sample.reference-provider-no-results').toString()
  await Extension.addWebExtension(url)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.xyz`, 'const value = 1')
  await Command.execute('Layout.openSideBarViewlet', 'Explorer')
  await Main.openUri(`${tmpDir}/test.xyz`)
  await Editor.findAllReferences()

  await expect(message).toHaveText('No Results')
  await expect(refreshButton).toHaveJSProperty('disabled', false)
  await expect(clearButton).toHaveJSProperty('disabled', false)
  await expect(collapseAllButton).toHaveJSProperty('disabled', false)
}
