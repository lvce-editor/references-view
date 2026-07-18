import { expect, test } from '@jest/globals'
import { restoreLanguageId } from '../src/parts/RestoreLanguageId/RestoreLanguageId.ts'

test('restoreLanguageId returns the language', () => {
  expect(restoreLanguageId({ language: 'typescript' })).toBe('typescript')
})

test('restoreLanguageId returns the default value for invalid input', () => {
  expect(restoreLanguageId(null)).toBe('')
  expect(restoreLanguageId('invalid')).toBe('')
  expect(restoreLanguageId({})).toBe('')
  expect(restoreLanguageId({ language: 1 })).toBe('')
})
