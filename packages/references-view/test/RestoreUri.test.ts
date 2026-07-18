import { expect, test } from '@jest/globals'
import { restoreUri } from '../src/parts/RestoreUri/RestoreUri.ts'

test('restoreUri returns the uri', () => {
  expect(restoreUri({ uri: 'file:///test.ts' })).toBe('file:///test.ts')
})

test('restoreUri returns the default value for invalid input', () => {
  expect(restoreUri(null)).toBe('')
  expect(restoreUri('invalid')).toBe('')
  expect(restoreUri({})).toBe('')
  expect(restoreUri({ uri: 1 })).toBe('')
})
