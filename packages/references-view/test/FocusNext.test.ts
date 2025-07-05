import { test, expect } from '@jest/globals'
import type { DisplayReference } from '../src/parts/DisplayReference/DisplayReference.ts'
import type { ReferencesState } from '../src/parts/ReferencesState/ReferencesState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusNext } from '../src/parts/FocusNext/FocusNext.ts'

test('focusNext should move to next item', () => {
  const state: ReferencesState = createDefaultState()
  const displayReferences: readonly DisplayReference[] = [
    { depth: 0, posInSet: 1, setSize: 2, type: 1, uri: '/test1.ts', name: 'test1.ts', lineText: '', icon: '', index: 0, startOffset: undefined, endOffset: undefined },
    { depth: 0, posInSet: 2, setSize: 2, type: 1, uri: '/test2.ts', name: 'test2.ts', lineText: '', icon: '', index: 1, startOffset: undefined, endOffset: undefined },
  ]
  const stateWithRefs: ReferencesState = { ...state, displayReferences, focusedIndex: 0 }

  const result = focusNext(stateWithRefs)
  expect(result.focusedIndex).toBe(1)
})

test('focusNext should wrap to first when at last', () => {
  const state: ReferencesState = createDefaultState()
  const displayReferences: readonly DisplayReference[] = [
    { depth: 0, posInSet: 1, setSize: 2, type: 1, uri: '/test1.ts', name: 'test1.ts', lineText: '', icon: '', index: 0, startOffset: undefined, endOffset: undefined },
    { depth: 0, posInSet: 2, setSize: 2, type: 1, uri: '/test2.ts', name: 'test2.ts', lineText: '', icon: '', index: 1, startOffset: undefined, endOffset: undefined },
  ]
  const stateWithRefs: ReferencesState = { ...state, displayReferences, focusedIndex: 1 }

  const result = focusNext(stateWithRefs)
  expect(result.focusedIndex).toBe(0)
})

test('focusNext should not change when no references', () => {
  const state: ReferencesState = createDefaultState()

  const result = focusNext(state)
  expect(result.focusedIndex).toBe(-1)
})
