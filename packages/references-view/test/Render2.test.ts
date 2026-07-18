import { expect, test } from '@jest/globals'
import { diffTree } from '@lvce-editor/virtual-dom-worker'
import type { ReferencesState } from '../src/parts/ReferencesState/ReferencesState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as LocationType from '../src/parts/LocationType/LocationType.ts'
import * as ReferencesStates from '../src/parts/ReferencesStates/ReferencesStates.ts'
import * as Render2 from '../src/parts/Render2/Render2.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'

test('render2 mounts the initial dom', () => {
  const uid = 41
  const oldState: ReferencesState = {
    ...createDefaultState(),
    id: uid,
    initial: true,
  }
  const newState: ReferencesState = {
    ...oldState,
    initial: false,
    message: 'No Results',
  }
  ReferencesStates.set(uid, oldState, newState)
  const diffResult = [DiffType.RenderIncremental]
  const result = Render2.render2(uid, diffResult)
  const expectedDom = RenderItems.renderItems(oldState, newState)[2]
  expect(result).toEqual([['Viewlet.setDom2', newState.id, expectedDom]])
})

test('render2 returns patches for RenderIncremental diff', () => {
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
  const diffResult = [DiffType.RenderIncremental]
  const result = Render2.render2(uid, diffResult)
  const oldDom = RenderItems.renderItems(oldState, oldState)[2]
  const newDom = RenderItems.renderItems(newState, newState)[2]
  const expectedPatches = diffTree(oldDom, newDom)
  expect(result).toEqual([['Viewlet.setPatches', newState.id, expectedPatches]])
})

test('render2 replaces the dom when the number of display references changes', () => {
  const uid = 43
  const oldState: ReferencesState = {
    ...createDefaultState(),
    displayReferences: [
      {
        depth: 0,
        endOffset: undefined,
        icon: '',
        index: 0,
        lineText: '',
        name: 'test.ts',
        posInSet: 1,
        setSize: 1,
        startOffset: undefined,
        type: LocationType.Collapsed,
        uri: 'file:///test.ts',
      },
    ],
    id: uid,
  }
  const newState: ReferencesState = {
    ...oldState,
    displayReferences: [],
  }
  ReferencesStates.set(uid, oldState, newState)

  const result = Render2.render2(uid, [DiffType.RenderIncremental])
  const expectedDom = RenderItems.renderItems(oldState, newState)[2]

  expect(result).toEqual([['Viewlet.setDom2', newState.id, expectedDom]])
})
