import { test, expect } from '@jest/globals'
import type { ReferencesState } from '../src/parts/ReferencesState/ReferencesState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as GetLocationsVirtualDom from '../src/parts/GetLocationsVirtualDom/GetLocationsVirtualDom.ts'
import * as ReferencesStates from '../src/parts/ReferencesStates/ReferencesStates.ts'
import * as Render2 from '../src/parts/Render2/Render2.ts'

test('render2 returns correct ViewletCommand for RenderItems diff', () => {
  const uid = 42
  const oldState: ReferencesState = {
    message: 'old message',
    references: [],
    displayReferences: [],
    id: 1,
    focusedIndex: 0,
  }
  const newState: ReferencesState = {
    message: 'new message',
    references: [],
    displayReferences: [],
    id: 2,
    focusedIndex: 1,
  }
  ReferencesStates.set(uid, oldState, newState)
  const diffResult = [DiffType.RenderItems]
  const result = Render2.render2(uid, diffResult)
  const expectedDom = GetLocationsVirtualDom.getLocationsVirtualDom(newState.displayReferences, newState.message)
  expect(result).toEqual([['Viewlet.setDom2', newState.id, expectedDom]])
})
