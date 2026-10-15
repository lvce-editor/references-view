import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'references.no-editor'

export const test: Test = async ({ Command, expect, Locator }) => {
  // arrange
  await Command.execute('Layout.openSideBarViewlet', 'References')

  // assert
  await expect(Locator('.LocationsMessage')).toHaveText('No Editor found')
  await expect(Locator('button[data-command="refresh"]')).toHaveAttribute('disabled', '')
  await expect(Locator('button[data-command="clear"]')).toHaveAttribute('disabled', '')
  await expect(Locator('button[data-command="collapseAll"]')).toHaveAttribute('disabled', '')
}
