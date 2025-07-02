import { test, expect } from '@jest/globals'
import { getIcon } from '../src/parts/IconTheme/IconTheme.js'

test('getIcon should return empty string', () => {
  expect(getIcon({})).toBe('')
  expect(getIcon({ foo: 'bar' })).toBe('')
})