import { test, expect } from '@jest/globals'
import * as GetReferencesMessage from '../src/parts/GetReferencesMessage/GetReferencesMessage.js'

const { getMessage } = GetReferencesMessage

test('getMessage should return no results message for 0 results', () => {
  const result: string = getMessage(0, 0)
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('getMessage should return one result message for 1 result in 1 file', () => {
  const result: string = getMessage(1, 1)
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('getMessage should return many results in one file message', () => {
  const result: string = getMessage(5, 1)
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('getMessage should return many results in many files message', () => {
  const result: string = getMessage(10, 3)
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('getUnsupportedUriMessage should name the unsupported builtin view', () => {
  expect(GetReferencesMessage.getUnsupportedUriMessage('process-explorer://')).toBe("Find file references isn't supported for Process Explorer.")
})

test('getUnsupportedUriMessage should leave other URI schemes supported', () => {
  expect(GetReferencesMessage.getUnsupportedUriMessage('memfs://workspace/file.ts')).toBeUndefined()
  expect(GetReferencesMessage.getUnsupportedUriMessage('file:///workspace/file.ts')).toBeUndefined()
})
