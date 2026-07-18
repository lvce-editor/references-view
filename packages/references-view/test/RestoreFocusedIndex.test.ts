import { expect, test } from '@jest/globals'
import { restoreFocusedIndex } from '../src/parts/RestoreFocusedIndex/RestoreFocusedIndex.ts'

test('restoreFocusedIndex returns the focused index', () => {
  expect(restoreFocusedIndex({ focusedIndex: 0 })).toBe(0)
  expect(restoreFocusedIndex({ focusedIndex: 5 })).toBe(5)
})

test('restoreFocusedIndex returns the default value for invalid input', () => {
  expect(restoreFocusedIndex(null)).toBe(-1)
  expect(restoreFocusedIndex('invalid')).toBe(-1)
  expect(restoreFocusedIndex({})).toBe(-1)
  expect(restoreFocusedIndex({ focusedIndex: '5' })).toBe(-1)
})
