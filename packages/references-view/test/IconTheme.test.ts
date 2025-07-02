import { test, expect } from '@jest/globals'
import * as IconTheme from '../src/parts/IconTheme/IconTheme.js'

test('getIcon should return empty string', () => {
  expect(IconTheme.getIcon({})).toBe('')
  expect(IconTheme.getIcon({ foo: 'bar' })).toBe('')
})