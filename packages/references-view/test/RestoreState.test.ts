import { test, expect } from '@jest/globals'
import { restoreState } from '../src/parts/RestoreState/RestoreState.ts'

test('restoreState should return RestoredState with focusedIndex from valid SavedState', () => {
  const input: unknown = {
    message: 'Test message',
    focusedIndex: 5,
  }

  const result = restoreState(input)

  expect(result).toEqual({
    focusedIndex: 5,
    offset: -1,
    uri: '',
    languageId: '',
    position: {},
  })
})

test('restoreState should return RestoredState with default focusedIndex when input is null', () => {
  const result = restoreState(null)

  expect(result).toEqual({
    focusedIndex: -1,
    offset: -1,
    uri: '',
    languageId: '',
    position: {},
  })
})

test('restoreState should return RestoredState with default focusedIndex when input is undefined', () => {
  const result = restoreState(undefined)

  expect(result).toEqual({
    focusedIndex: -1,
    offset: -1,
    uri: '',
    languageId: '',
    position: {},
  })
})

test('restoreState should return RestoredState with default focusedIndex when input is not an object', () => {
  const result = restoreState('string')

  expect(result).toEqual({
    focusedIndex: -1,
    offset: -1,
    uri: '',
    languageId: '',
    position: {},
  })
})

test('restoreState should return RestoredState with default focusedIndex when focusedIndex is missing', () => {
  const input = {
    message: 'Test message',
  }

  const result = restoreState(input)

  expect(result).toEqual({
    focusedIndex: -1,
    offset: -1,
    uri: '',
    languageId: '',
    position: {},
  })
})

test('restoreState should return RestoredState with focusedIndex 0', () => {
  const input: unknown = {
    message: 'Test message',
    focusedIndex: 0,
  }

  const result = restoreState(input)

  expect(result).toEqual({
    focusedIndex: 0,
    offset: -1,
    uri: '',
    languageId: '',
    position: {},
  })
})
