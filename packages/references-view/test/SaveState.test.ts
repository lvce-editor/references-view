import { test, expect } from '@jest/globals'
import type { ReferencesState } from '../src/parts/ReferencesState/ReferencesState.ts'
import type { SavedState } from '../src/parts/SavedState/SavedState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ReferencesStates from '../src/parts/ReferencesStates/ReferencesStates.ts'
import { saveState } from '../src/parts/SaveState/SaveState.ts'

test('saveState should return SavedState with message and focusedIndex from ReferencesState', () => {
  const id = 1
  const mockReferencesState: ReferencesState = {
    ...createDefaultState(),

    displayReferences: [],
    focusedIndex: 0,
    id: 1,
    message: 'Test message',
    references: [],
  }

  ReferencesStates.set(id, mockReferencesState, mockReferencesState)

  const result: SavedState = saveState(id)

  expect(result).toEqual({
    focusedIndex: 0,
    languageId: '',
    message: 'Test message',
    offset: -1,
    uri: '',
  })
})

test('saveState should return SavedState with empty message and focusedIndex when ReferencesState has empty message', () => {
  const id = 2
  const mockReferencesState: ReferencesState = {
    ...createDefaultState(),

    displayReferences: [],
    focusedIndex: 5,
    id: 2,
    message: '',
    references: [],
  }

  ReferencesStates.set(id, mockReferencesState, mockReferencesState)

  const result: SavedState = saveState(id)

  expect(result).toEqual({
    focusedIndex: 5,
    languageId: '',
    message: '',
    offset: -1,
    uri: '',
  })
})
