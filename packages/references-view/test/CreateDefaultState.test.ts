import { test, expect } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.js'

test('createDefaultState should create state with default values', () => {
  const state = CreateDefaultState.createDefaultState()
  expect(state).toBeDefined()
})
