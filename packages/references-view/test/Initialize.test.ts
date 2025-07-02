import { test, expect } from '@jest/globals'
import { initialize } from '../src/parts/Initialize/Initialize.js'

test('initialize should be a function', () => {
  expect(typeof initialize).toBe('function')
})