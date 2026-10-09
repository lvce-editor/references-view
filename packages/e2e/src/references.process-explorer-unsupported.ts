import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'references.process-explorer-unsupported'
export const skip = 1

export const test: Test = async ({ Editor, expect, Locator, Main }) => {
  // arrange
  await Main.openUri('process-explorer://')

  // act
  await Editor.findAllReferences()

  // assert
  const viewletLocations = Locator('.Locations')
  await expect(viewletLocations).toBeVisible()
  const viewletReferencesMessage = Locator('.LocationsMessage')
  await expect(viewletReferencesMessage).toHaveText("Find file references isn't supported for Process Explorer.")
}
