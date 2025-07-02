import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.js'
import { diff } from '../src/parts/Diff/Diff.js'

test('diff should return an array (integration test)', () => {
  // This test just checks that diff returns an array for valid input
  const result = diff(createDefaultState(1), createDefaultState(2))
  expect(Array.isArray(result)).toBe(true)
})