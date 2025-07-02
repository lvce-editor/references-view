import { test, expect } from '@jest/globals'
import { terminate } from '../src/parts/Terminate/Terminate.js'

test('terminate should be a function', () => {
  expect(typeof terminate).toBe('function')
})