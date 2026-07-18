import { expect, test } from '@jest/globals'
import { restorePosition } from '../src/parts/RestorePosition/RestorePosition.ts'

test('restorePosition returns the position', () => {
  const position = {
    columnIndex: 4,
    rowIndex: 2,
  }

  expect(restorePosition({ position })).toBe(position)
})

test('restorePosition preserves a null position', () => {
  expect(restorePosition({ position: null })).toBeNull()
})

test('restorePosition returns the default value for invalid input', () => {
  expect(restorePosition(null)).toEqual({})
  expect(restorePosition('invalid')).toEqual({})
  expect(restorePosition({})).toEqual({})
  expect(restorePosition({ position: 1 })).toEqual({})
})
