import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { selectIndexLead } from '../src/parts/SelectIndexLead/SelectIndexLead.ts'

test('selectIndexLead should update focusedIndex', async () => {
  const state = createDefaultState()
  const displayReference = {
    depth: 0,
    posInSet: 1,
    setSize: 1,
    type: 1,
    uri: 'file:///test.ts',
    name: 'test.ts',
    lineText: 'test',
    icon: 'file',
    index: 0,
    startOffset: undefined,
    endOffset: undefined,
  }

  const newState = {
    ...state,
    displayReferences: [displayReference],
  }

  const result = await selectIndexLead(newState, 0)
  expect(result.focusedIndex).toBe(0)
  expect(result.displayReferences).toBe(newState.displayReferences)
})

test('selectIndexLead should preserve other state properties', async () => {
  const state = createDefaultState()
  const displayReference = {
    depth: 0,
    posInSet: 1,
    setSize: 1,
    type: 1,
    uri: 'file:///test.ts',
    name: 'test.ts',
    lineText: 'test',
    icon: 'file',
    index: 0,
    startOffset: undefined,
    endOffset: undefined,
  }

  const newState = {
    ...state,
    displayReferences: [displayReference],
    focusedIndex: -1,
  }

  const result = await selectIndexLead(newState, 0)
  expect(result.focusedIndex).toBe(0)
  expect(result.message).toBe(newState.message)
  expect(result.references).toBe(newState.references)
  expect(result.id).toBe(newState.id)
})