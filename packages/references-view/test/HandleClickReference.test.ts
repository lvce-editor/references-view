import { jest, test, expect } from '@jest/globals'
import type { ReferencesState } from '../src/parts/ReferencesState/ReferencesState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickReference } from '../src/parts/HandleClickReference/HandleClickReference.ts'

test('handleClickReference with valid numeric string', async () => {
  const state = createDefaultState()
  const result = await handleClickReference(state, '0')
  expect(result).toBeDefined()
})

test('handleClickReference with invalid string returns original state', async () => {
  const state = createDefaultState()
  const result = await handleClickReference(state, 'invalid')
  expect(result).toBe(state)
})

test('handleClickReference with empty string returns original state', async () => {
  const state = createDefaultState()
  const result = await handleClickReference(state, '')
  expect(result).toBe(state)
})

test('handleClickReference with negative index string', async () => {
  const state = createDefaultState()
  const result = await handleClickReference(state, '-1')
  expect(result).toBe(state)
})

test('handleClickReference with out of bounds index string', async () => {
  const state = createDefaultState()
  const result = await handleClickReference(state, '999')
  expect(result).toBe(state)
})