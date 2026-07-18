import { expect, test } from '@jest/globals'
import { restoreOffset } from '../src/parts/RestoreOffset/RestoreOffset.ts'

test('restoreOffset returns the offset', () => {
  expect(restoreOffset({ offset: 0 })).toBe(0)
  expect(restoreOffset({ offset: 24 })).toBe(24)
})

test('restoreOffset returns the default value for invalid input', () => {
  expect(restoreOffset(null)).toBe(-1)
  expect(restoreOffset('invalid')).toBe(-1)
  expect(restoreOffset({})).toBe(-1)
  expect(restoreOffset({ offset: '24' })).toBe(-1)
})
