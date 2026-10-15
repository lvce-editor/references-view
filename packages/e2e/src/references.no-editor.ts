import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'references.no-editor'

export const test: Test = async ({ Command, expect, Locator }) => {
  // arrange
  await Command.execute('Layout.openSideBarViewlet', 'References')

  // assert
  const message = Locator('.LocationsMessage')
  const refreshButton = Locator('button[data-command="refresh"]')
  const clearButton = Locator('button[data-command="clear"]')
  const collapseAllButton = Locator('button[data-command="collapseAll"]')
  await expect(message).toHaveText('No Editor found')
  await expect(refreshButton).toHaveAttribute('disabled', '')
  await expect(clearButton).toHaveAttribute('disabled', '')
  await expect(collapseAllButton).toHaveAttribute('disabled', '')
}
