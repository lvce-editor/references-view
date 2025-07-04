import { test, expect } from '@jest/globals'
import type { ReferencesState } from '../src/parts/ReferencesState/ReferencesState.ts'
import type { SavedState } from '../src/parts/SavedState/SavedState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ReferencesStates from '../src/parts/ReferencesStates/ReferencesStates.ts'
import { saveState } from '../src/parts/SaveState/SaveState.ts'

test('saveState should return SavedState with message and focusedIndex from ReferencesState', () => {
  const id: number = 1
  const mockReferencesState: ReferencesState = {
    ...createDefaultState(),

    message: 'Test message',
    references: [],
    displayReferences: [],
    id: 1,
    focusedIndex: 0,
  }

  ReferencesStates.set(id, mockReferencesState, mockReferencesState)

  const result: SavedState = saveState(id)

  expect(result).toEqual({
    message: 'Test message',
    focusedIndex: 0,
  })
})

test('saveState should return SavedState with empty message and focusedIndex when ReferencesState has empty message', () => {
  const id: number = 2
  const mockReferencesState: ReferencesState = {
    ...createDefaultState(),

    message: '',
    references: [],
    displayReferences: [],
    id: 2,
    focusedIndex: 5,
  }

  ReferencesStates.set(id, mockReferencesState, mockReferencesState)

  const result: SavedState = saveState(id)

  expect(result).toEqual({
    message: '',
    focusedIndex: 5,
  })
})
