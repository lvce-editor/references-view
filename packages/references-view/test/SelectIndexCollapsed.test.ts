import { test, expect } from '@jest/globals'
import type { DisplayReference } from '../src/parts/DisplayReference/DisplayReference.ts'
import type { ReferencesState } from '../src/parts/ReferencesState/ReferencesState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { selectIndexCollapsed } from '../src/parts/SelectIndexCollapsed/SelectIndexCollapsed.ts'

test('selectIndexCollapsed should update focusedIndex', () => {
  const state: ReferencesState = createDefaultState()
  const displayReference: DisplayReference = {
    depth: 0,
    endOffset: undefined,
    icon: 'file',
    index: 0,
    lineText: 'test',
    name: 'test.ts',
    posInSet: 1,
    setSize: 1,
    startOffset: undefined,
    type: 3,
    uri: 'file:///test.ts',
  }

  const newState: ReferencesState = {
    ...state,
    displayReferences: [displayReference],
  }

  const result = selectIndexCollapsed(newState, 0)
  expect(result.focusedIndex).toBe(0)
  expect(result.displayReferences).toBe(newState.displayReferences)
})

test('selectIndexCollapsed should preserve other state properties', () => {
  const state: ReferencesState = createDefaultState()
  const displayReference: DisplayReference = {
    depth: 0,
    endOffset: undefined,
    icon: 'file',
    index: 0,
    lineText: 'test',
    name: 'test.ts',
    posInSet: 1,
    setSize: 1,
    startOffset: undefined,
    type: 3,
    uri: 'file:///test.ts',
  }

  const newState: ReferencesState = {
    ...state,
    displayReferences: [displayReference],
    focusedIndex: -1,
  }

  const result = selectIndexCollapsed(newState, 0)
  expect(result.focusedIndex).toBe(0)
  expect(result.message).toBe(newState.message)
  expect(result.references).toBe(newState.references)
  expect(result.id).toBe(newState.id)
})
