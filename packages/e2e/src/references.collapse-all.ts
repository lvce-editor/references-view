import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'references.collapse-all'

export const test: Test = async ({ Command, Extension, FileSystem, Main, Editor, Locator, expect }) => {
  // arrange
  const url = import.meta.resolve('../fixtures/sample.reference-provider-basic').toString()
  await Extension.addWebExtension(url)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/add.xyz`,
    `export const add = () => {}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/test.xyz`,
    `import { add } from './add.xyz'

add(1,2)
`,
  )
  await Main.openUri(`${tmpDir}/test.xyz`)
  await Editor.setCursor(2, 2)
  await Editor.findAllReferences()
  const viewletLocations = Locator('.Locations')
  await expect(viewletLocations).toBeVisible()
  const viewletReferencesMessage = Locator('.LocationsMessage')
  await expect(viewletReferencesMessage).toHaveText('1 result in 1 file')
  const referenceItems = viewletLocations.locator('.TreeItem')
  const referenceItemOne = referenceItems.nth(0)
  await expect(referenceItemOne).toHaveText('test.xyz')
  const referenceItemTwo = referenceItems.nth(1)
  await expect(referenceItemTwo).toHaveText(`import { add } from './add.xyz'`)

  // act
  await Command.execute('References.collapseAll')

  // assert
  // TODO
}
