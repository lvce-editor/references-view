import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { DisplayReference } from '../src/parts/DisplayReference/DisplayReference.ts'
import type { ReferencesState } from '../src/parts/ReferencesState/ReferencesState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as LocationType from '../src/parts/LocationType/LocationType.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import { selectIndex } from '../src/parts/SelectIndex/SelectIndex.ts'

test('selectIndex should return same state when index is out of bounds', async () => {
  const state: ReferencesState = createDefaultState()
  const result = await selectIndex(state, -1)
  expect(result).toBe(state)

  const result2 = await selectIndex(state, 10)
  expect(result2).toBe(state)
})

test('selectIndex should update focusedIndex for Leaf type', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.readDirWithFileTypes') {
        return []
      }
      return undefined
    },
  })
  RendererWorker.set(mockRpc)

  const state: ReferencesState = createDefaultState()
  const displayReference: DisplayReference = {
    depth: 0,
    posInSet: 1,
    setSize: 1,
    type: LocationType.Leaf,
    uri: 'file:///test.ts',
    name: 'test.ts',
    lineText: 'test',
    icon: 'file',
    index: 0,
    startOffset: undefined,
    endOffset: undefined,
  }

  const newState: ReferencesState = {
    ...state,
    displayReferences: [displayReference],
  }

  const result = await selectIndex(newState, 0)
  expect(result.focusedIndex).toBe(0)
  expect(result.displayReferences).toBe(newState.displayReferences)
})

test('selectIndex should update focusedIndex for Expanded type', async () => {
  const state: ReferencesState = createDefaultState()
  const displayReference: DisplayReference = {
    depth: 0,
    posInSet: 1,
    setSize: 1,
    type: LocationType.Expanded,
    uri: 'file:///test.ts',
    name: 'test.ts',
    lineText: 'test',
    icon: 'file',
    index: 0,
    startOffset: undefined,
    endOffset: undefined,
  }

  const newState: ReferencesState = {
    ...state,
    displayReferences: [displayReference],
  }

  const result = await selectIndex(newState, 0)
  expect(result.focusedIndex).toBe(0)
  expect(result.displayReferences).toBe(newState.displayReferences)
})

test('selectIndex should update focusedIndex for Collapsed type', async () => {
  const state: ReferencesState = createDefaultState()
  const displayReference: DisplayReference = {
    depth: 0,
    posInSet: 1,
    setSize: 1,
    type: LocationType.Collapsed,
    uri: 'file:///test.ts',
    name: 'test.ts',
    lineText: 'test',
    icon: 'file',
    index: 0,
    startOffset: undefined,
    endOffset: undefined,
  }

  const newState: ReferencesState = {
    ...state,
    displayReferences: [displayReference],
  }

  const result = await selectIndex(newState, 0)
  expect(result.focusedIndex).toBe(0)
  expect(result.displayReferences).toBe(newState.displayReferences)
})

test('selectIndex should return same state for unknown type', async () => {
  const state: ReferencesState = createDefaultState()
  const displayReference: DisplayReference = {
    depth: 0,
    posInSet: 1,
    setSize: 1,
    type: 999, // unknown type
    uri: 'file:///test.ts',
    name: 'test.ts',
    lineText: 'test',
    icon: 'file',
    index: 0,
    startOffset: undefined,
    endOffset: undefined,
  }

  const newState: ReferencesState = {
    ...state,
    displayReferences: [displayReference],
  }

  const result = await selectIndex(newState, 0)
  expect(result).toBe(newState)
})

test('selectIndex should handle multiple display references', async () => {
  const state: ReferencesState = createDefaultState()
  const displayReferences: readonly DisplayReference[] = [
    {
      depth: 0,
      posInSet: 1,
      setSize: 2,
      type: LocationType.Leaf,
      uri: 'file:///test1.ts',
      name: 'test1.ts',
      lineText: 'test1',
      icon: 'file',
      index: 0,
      startOffset: undefined,
      endOffset: undefined,
    },
    {
      depth: 0,
      posInSet: 2,
      setSize: 2,
      type: LocationType.Expanded,
      uri: 'file:///test2.ts',
      name: 'test2.ts',
      lineText: 'test2',
      icon: 'file',
      index: 1,
      startOffset: undefined,
      endOffset: undefined,
    },
  ]

  const newState: ReferencesState = {
    ...state,
    displayReferences,
  }

  const result = await selectIndex(newState, 1)
  expect(result.focusedIndex).toBe(1)
  expect(result.displayReferences).toBe(newState.displayReferences)
})
