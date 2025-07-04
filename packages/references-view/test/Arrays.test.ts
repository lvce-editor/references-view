import { test, expect } from '@jest/globals'
import * as Arrays from '../src/parts/Arrays/Arrays.js'

test('removeElement should remove the specified element from array', () => {
  const array: readonly number[] = [1, 2, 3, 4, 5]
  const result: readonly number[] = Arrays.removeElement(array, 3)
  expect(result).toEqual([1, 2, 4, 5])
})

test('removeElement should return original array if element not found', () => {
  const array: readonly number[] = [1, 2, 3, 4, 5]
  const result: readonly number[] = Arrays.removeElement(array, 6)
  expect(result).toEqual([1, 2, 3, 4, 5])
})

test('removeElement should work with strings', () => {
  const array: readonly string[] = ['a', 'b', 'c', 'd']
  const result: readonly string[] = Arrays.removeElement(array, 'b')
  expect(result).toEqual(['a', 'c', 'd'])
})

test('removeElement should work with empty array', () => {
  const array: readonly number[] = []
  const result: readonly number[] = Arrays.removeElement(array, 1)
  expect(result).toEqual([])
})