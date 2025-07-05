import { test, expect } from '@jest/globals'
import type { DisplayReference } from '../src/parts/DisplayReference/DisplayReference.ts'
import type { ReferencesState } from '../src/parts/ReferencesState/ReferencesState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusIndex } from '../src/parts/FocusIndex/FocusIndex.ts'

test('focusIndex should set focusedIndex to valid index', () => {
  const state: ReferencesState = createDefaultState()
  const displayReferences: readonly DisplayReference[] = [
    { depth: 0, posInSet: 1, setSize: 2, type: 1, uri: '/test1.ts', name: 'test1.ts', lineText: '', icon: '', index: 0, startOffset: undefined, endOffset: undefined },
    { depth: 0, posInSet: 2, setSize: 2, type: 1, uri: '/test2.ts', name: 'test2.ts', lineText: '', icon: '', index: 1, startOffset: undefined, endOffset: undefined },
  ]
  const stateWithRefs: ReferencesState = { ...state, displayReferences }

  const result = focusIndex(stateWithRefs, 1)
  expect(result.focusedIndex).toBe(1)
})

test('focusIndex should not change state for invalid index', () => {
  const state: ReferencesState = createDefaultState()
  const displayReferences: readonly DisplayReference[] = [
    { depth: 0, posInSet: 1, setSize: 1, type: 1, uri: '/test1.ts', name: 'test1.ts', lineText: '', icon: '', index: 0, startOffset: undefined, endOffset: undefined },
  ]
  const stateWithRefs: ReferencesState = { ...state, displayReferences }

  const result = focusIndex(stateWithRefs, 5)
  expect(result.focusedIndex).toBe(-1)
})
