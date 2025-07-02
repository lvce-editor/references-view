import { test, expect } from '@jest/globals'
import { getFileCount } from '../src/parts/GetReferencesFileCount/GetReferencesFileCount.js'

test('getFileCount should count unique URIs', () => {
  const references = [
    { uri: 'file1.ts' },
    { uri: 'file2.ts' },
    { uri: 'file1.ts' },
    { uri: 'file3.ts' },
  ]
  expect(getFileCount(references)).toBe(3)
})

test('getFileCount should return 0 for empty array', () => {
  expect(getFileCount([])).toBe(0)
})

test('getFileCount should return 1 for single file', () => {
  const references = [
    { uri: 'file1.ts' },
    { uri: 'file1.ts' },
  ]
  expect(getFileCount(references)).toBe(1)
})