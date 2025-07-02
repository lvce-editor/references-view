import { test, expect } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.js'
import * as Diff from '../src/parts/Diff/Diff.js'

test('diff should return an array (integration test)', () => {
  // This test just checks that diff returns an array for valid input
  const result = Diff.diff(CreateDefaultState.createDefaultState(1), CreateDefaultState.createDefaultState(2))
  expect(Array.isArray(result)).toBe(true)
})