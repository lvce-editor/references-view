import { test, expect } from '@jest/globals'
import type { ReferencesState } from '../src/parts/ReferencesState/ReferencesState.ts'
import type { SavedState } from '../src/parts/SavedState/SavedState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ReferencesStates from '../src/parts/ReferencesStates/ReferencesStates.ts'
import { saveState } from '../src/parts/SaveState/SaveState.ts'

test('saveState should return SavedState with message from ReferencesState', () => {
  const id = 1
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
  })
})

test('saveState should return SavedState with empty message when ReferencesState has empty message', () => {
  const id = 2
  const mockReferencesState: ReferencesState = {
    ...createDefaultState(),

    message: '',
    references: [],
    displayReferences: [],
    id: 2,
    focusedIndex: 0,
  }

  ReferencesStates.set(id, mockReferencesState, mockReferencesState)

  const result: SavedState = saveState(id)

  expect(result).toEqual({
    message: '',
  })
})
