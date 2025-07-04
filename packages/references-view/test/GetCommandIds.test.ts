import { test, expect } from '@jest/globals'
import * as GetCommandIds from '../src/parts/GetCommandIds/GetCommandIds.js'

test('getCommandIds should return an array of strings', () => {
  const result: readonly string[] = GetCommandIds.getCommandIds()
  expect(Array.isArray(result)).toBe(true)
  for (const id of result) {
    expect(typeof id).toBe('string')
  }
})