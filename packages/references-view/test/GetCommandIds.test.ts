import { test, expect } from '@jest/globals'
import { getCommandIds } from '../src/parts/GetCommandIds/GetCommandIds.js'

test('getCommandIds should return an array of strings', () => {
  const result = getCommandIds()
  expect(Array.isArray(result)).toBe(true)
  for (const id of result) {
    expect(typeof id).toBe('string')
  }
})