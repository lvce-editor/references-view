import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.debug-provider-scope'

export const skip = 1

export const test: Test = async ({ FileSystem, Workspace, Extension, SideBar, Locator, expect }) => {
  // arrange
  await SideBar.open('Explorer')
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)
  const extensionUrl = new URL(`../fixtures/${name}`, import.meta.url).toString()
  await Extension.addWebExtension(extensionUrl)

  // act
  await SideBar.open('Run And Debug')

  // assert
  const debugButtonOne = Locator('.DebugButton').nth(0)
  await expect(debugButtonOne).toHaveAttribute('title', 'Resume')
  const rows = Locator('.DebugRow')
  await expect(rows).toHaveCount(13)
  await expect(rows.nth(0)).toHaveText('Watch')
  await expect(rows.nth(1)).toHaveText('BreakPoints')
  await expect(rows.nth(2)).toHaveText('Scope')
  await expect(rows.nth(3)).toHaveText('Local')
  await expect(rows.nth(4)).toHaveText('this: process')
  await expect(rows.nth(5)).toHaveText('now: 1985388')
  await expect(rows.nth(6)).toHaveText('list: undefined')
  await expect(rows.nth(7)).toHaveText('ranAtLeastOneList: undefined')
  await expect(rows.nth(8)).toHaveText('Closure (getTimerCallbacks)')
  await expect(rows.nth(9)).toHaveText('Closure')

  // TODO
  // await expect(rows.nth(7)).toHaveText('Global')
  // await expect(rows.nth(8)).toHaveText('processTimers')
}
