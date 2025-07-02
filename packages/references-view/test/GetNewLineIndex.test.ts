import { test, expect } from '@jest/globals'
import * as GetNewLineIndex from '../src/parts/GetNewLineIndex/GetNewLineIndex.js'

test('getNewLineIndex should find newline in string', () => {
  const result = GetNewLineIndex.getNewLineIndex('hello\nworld')
  expect(result).toBe(5)
})

test('getNewLineIndex should return -1 when no newline found', () => {
  const result = GetNewLineIndex.getNewLineIndex('hello world')
  expect(result).toBe(-1)
})

test('getNewLineIndex should find newline after startIndex', () => {
  const result = GetNewLineIndex.getNewLineIndex('hello\nworld\nagain', 6)
  expect(result).toBe(11)
})

test('getNewLineIndex should return -1 when no newline after startIndex', () => {
  const result = GetNewLineIndex.getNewLineIndex('hello\nworld', 6)
  expect(result).toBe(-1)
})

test('getNewLineIndex should work with empty string', () => {
  const result = GetNewLineIndex.getNewLineIndex('')
  expect(result).toBe(-1)
})

test('getNewLineIndex should work with string starting with newline', () => {
  const result = GetNewLineIndex.getNewLineIndex('\nhello')
  expect(result).toBe(0)
})