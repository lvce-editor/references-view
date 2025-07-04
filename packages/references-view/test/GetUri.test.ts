import { test, expect } from '@jest/globals'
import type { DisplayReference } from '../src/parts/DisplayReference/DisplayReference.ts'
import type { ReferencesState } from '../src/parts/ReferencesState/ReferencesState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getUri } from '../src/parts/GetUri/GetUri.ts'

test('getUri should return uri for valid index', () => {
  const state: ReferencesState = createDefaultState()
  const displayReference: DisplayReference = {
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

  const newState: ReferencesState = {
    ...state,
    displayReferences: [displayReference],
  }

  const result: string = getUri(newState, 0)
  expect(result).toBe('file:///test.ts')
})

test('getUri should return empty string for invalid index', () => {
  const state: ReferencesState = createDefaultState()
  const result: string = getUri(state, -1)
  expect(result).toBe('')

  const result2: string = getUri(state, 10)
  expect(result2).toBe('')
})

test('getUri should return empty string for undefined uri', () => {
  const state: ReferencesState = createDefaultState()
  const displayReference: DisplayReference = {
    depth: 0,
    posInSet: 1,
    setSize: 1,
    type: 1,
    uri: '',
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

  const result: string = getUri(newState, 0)
  expect(result).toBe('')
})