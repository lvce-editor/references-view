import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'references.no-provider'

export const test: Test = async ({ Editor, expect, FileSystem, Locator, Main }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/add.xyz`,
    `export const add = () => {}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/test.xyz`,
    `import { add } from './add.ts'

add(1,2)
`,
  )
  await Main.openUri(`${tmpDir}/test.xyz`)
  await Editor.setCursor(1, 0)

  // act
  await Editor.findAllReferences()

  // assert
  const viewletLocations = Locator('.Viewlet.Error')
  await expect(viewletLocations).toBeVisible()
  await expect(viewletLocations).toHaveText(`Error: Cannot read properties of undefined (reading 'provideReferences2')`)
}
