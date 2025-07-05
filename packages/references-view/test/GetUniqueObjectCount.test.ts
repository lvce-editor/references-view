import { test, expect } from '@jest/globals'
import * as GetUniqueObjectCount from '../src/parts/GetUniqueObjectCount/GetUniqueObjectCount.js'

test('getUniqueObjectCount should count unique values by key', () => {
  const arr: readonly { readonly id: number }[] = [{ id: 1 }, { id: 2 }, { id: 1 }, { id: 3 }, { id: 2 }]
  expect(GetUniqueObjectCount.getUniqueObjectCount(arr, 'id')).toBe(3)
})

test('getUniqueObjectCount should return 0 for empty array', () => {
  expect(GetUniqueObjectCount.getUniqueObjectCount([], 'id')).toBe(0)
})
