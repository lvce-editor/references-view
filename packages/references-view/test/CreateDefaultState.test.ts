import { test, expect } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.js'
import * as ReferencesStates from '../src/parts/ReferencesStates/ReferencesStates.js'

test('createDefaultState should create state with default values', () => {
  const state = CreateDefaultState.createDefaultState()

  expect(state.id).toBe(0)
  expect(state.message).toBe('')
  expect(state.references).toEqual([])
  expect(state.displayReferences).toEqual([])
  expect(state.focusedIndex).toBe(-1)
})

test('createDefaultState should create state with custom uid', () => {
  const state = CreateDefaultState.createDefaultState(123)

  expect(state.id).toBe(123)
  expect(state.message).toBe('')
  expect(state.references).toEqual([])
  expect(state.displayReferences).toEqual([])
  expect(state.focusedIndex).toBe(-1)
})

test('createDefaultState should register state in ReferencesStates', () => {
  const state = CreateDefaultState.createDefaultState(456)
  const retrievedState = ReferencesStates.get(456)

  expect(retrievedState.newState).toBe(state)
})