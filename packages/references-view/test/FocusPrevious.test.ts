import { test, expect } from '@jest/globals'
import type { DisplayReference } from '../src/parts/DisplayReference/DisplayReference.ts'
import type { ReferencesState } from '../src/parts/ReferencesState/ReferencesState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusPrevious } from '../src/parts/FocusPrevious/FocusPrevious.ts'

test('focusPrevious should move to previous item', () => {
  const state: ReferencesState = createDefaultState()
  const displayReferences: readonly DisplayReference[] = [
    { depth: 0, endOffset: undefined, icon: '', index: 0, lineText: '', name: 'test1.ts', posInSet: 1, setSize: 2, startOffset: undefined, type: 1, uri: '/test1.ts' },
    { depth: 0, endOffset: undefined, icon: '', index: 1, lineText: '', name: 'test2.ts', posInSet: 2, setSize: 2, startOffset: undefined, type: 1, uri: '/test2.ts' },
  ]
  const stateWithRefs: ReferencesState = { ...state, displayReferences, focusedIndex: 1 }

  const result = focusPrevious(stateWithRefs)
  expect(result.focusedIndex).toBe(0)
})

test('focusPrevious should wrap to last when at first', () => {
  const state: ReferencesState = createDefaultState()
  const displayReferences: readonly DisplayReference[] = [
    { depth: 0, endOffset: undefined, icon: '', index: 0, lineText: '', name: 'test1.ts', posInSet: 1, setSize: 2, startOffset: undefined, type: 1, uri: '/test1.ts' },
    { depth: 0, endOffset: undefined, icon: '', index: 1, lineText: '', name: 'test2.ts', posInSet: 2, setSize: 2, startOffset: undefined, type: 1, uri: '/test2.ts' },
  ]
  const stateWithRefs: ReferencesState = { ...state, displayReferences, focusedIndex: 0 }

  const result = focusPrevious(stateWithRefs)
  expect(result.focusedIndex).toBe(1)
})

test('focusPrevious should not change when no references', () => {
  const state: ReferencesState = createDefaultState()

  const result = focusPrevious(state)
  expect(result.focusedIndex).toBe(-1)
})
