import { test, expect } from '@jest/globals'
import * as GetName from '../src/parts/GetName/GetName.ts'

test('getName returns empty string for empty uri', () => {
  const result = GetName.getName('')
  expect(result).toBe('')
})

test('getName returns empty string for falsy uri', () => {
  const result = GetName.getName(null as any)
  expect(result).toBe('')
})

test('getName returns filename from simple path', () => {
  const result = GetName.getName('/path/to/file.ts')
  expect(result).toBe('file.ts')
})

test('getName returns filename from path with no extension', () => {
  const result = GetName.getName('/path/to/filename')
  expect(result).toBe('filename')
})

test('getName returns filename from path with multiple dots', () => {
  const result = GetName.getName('/path/to/file.test.ts')
  expect(result).toBe('file.test.ts')
})

test('getName returns filename from path with no directory', () => {
  const result = GetName.getName('file.ts')
  expect(result).toBe('file.ts')
})

test('getName returns filename from path ending with slash', () => {
  const result = GetName.getName('/path/to/')
  expect(result).toBe('')
})

test('getName returns filename from Windows path', () => {
  const result = GetName.getName('C:\\path\\to\\file.ts')
  expect(result).toBe('file.ts')
})