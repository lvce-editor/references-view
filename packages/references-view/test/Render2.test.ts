import { test, expect } from '@jest/globals'
import type { ReferencesState } from '../src/parts/ReferencesState/ReferencesState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as GetLocationsVirtualDom from '../src/parts/GetLocationsVirtualDom/GetLocationsVirtualDom.ts'
import * as ReferencesStates from '../src/parts/ReferencesStates/ReferencesStates.ts'
import * as Render2 from '../src/parts/Render2/Render2.ts'

test('render2 returns correct ViewletCommand for RenderItems diff', () => {
  const uid = 42
  const oldState: ReferencesState = {
    ...createDefaultState(),
    displayReferences: [],
    focusedIndex: 0,
    id: 1,
    message: 'old message',
    references: [],
  }
  const newState: ReferencesState = {
    ...createDefaultState(),

    displayReferences: [],
    focusedIndex: 1,
    id: 2,
    message: 'new message',
    references: [],
  }
  ReferencesStates.set(uid, oldState, newState)
  const diffResult = [DiffType.RenderItems]
  const result = Render2.render2(uid, diffResult)
  const expectedDom = GetLocationsVirtualDom.getLocationsVirtualDom(newState.displayReferences, newState.message)
  expect(result).toEqual([['Viewlet.setDom2', newState.id, expectedDom]])
})
