import { test, expect } from '@jest/globals'
import * as GetName from '../src/parts/GetBaseName/GetBaseName.ts'

test('getName returns empty string for empty uri', () => {
  const result = GetName.getBaseName('')
  expect(result).toBe('')
})

test('getName returns empty string for falsy uri', () => {
  const result = GetName.getBaseName(null as any)
  expect(result).toBe('')
})

test('getName returns filename from simple path', () => {
  const result = GetName.getBaseName('/path/to/file.ts')
  expect(result).toBe('file.ts')
})

test('getName returns filename from path with no extension', () => {
  const result = GetName.getBaseName('/path/to/filename')
  expect(result).toBe('filename')
})

test('getName returns filename from path with multiple dots', () => {
  const result = GetName.getBaseName('/path/to/file.test.ts')
  expect(result).toBe('file.test.ts')
})

test('getName returns filename from path with no directory', () => {
  const result = GetName.getBaseName('file.ts')
  expect(result).toBe('file.ts')
})

test('getName returns filename from path ending with slash', () => {
  const result = GetName.getBaseName('/path/to/')
  expect(result).toBe('')
})

test.skip('getName returns filename from Windows path', () => {
  const result = GetName.getBaseName('C:\\path\\to\\file.ts')
  expect(result).toBe('file.ts')
})
