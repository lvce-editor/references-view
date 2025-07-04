import { test, expect } from '@jest/globals'
import type { DisplayReference } from '../src/parts/DisplayReference/DisplayReference.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusLast } from '../src/parts/FocusLast/FocusLast.ts'

test('focusLast should focus last item', () => {
  const state = createDefaultState()
  const displayReferences: DisplayReference[] = [
    { depth: 0, posInSet: 1, setSize: 2, type: 1, uri: '/test1.ts', name: 'test1.ts', lineText: '', icon: '', index: 0, startOffset: undefined, endOffset: undefined },
    { depth: 0, posInSet: 2, setSize: 2, type: 1, uri: '/test2.ts', name: 'test2.ts', lineText: '', icon: '', index: 1, startOffset: undefined, endOffset: undefined },
  ]
  const stateWithRefs = { ...state, displayReferences }

  const result = focusLast(stateWithRefs)
  expect(result.focusedIndex).toBe(1)
})

test('focusLast should set to -1 when no references', () => {
  const state = createDefaultState()

  const result = focusLast(state)
  expect(result.focusedIndex).toBe(-1)
})