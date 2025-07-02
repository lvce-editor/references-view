import { test, expect } from '@jest/globals'
import { initializeExtensionHost } from '../src/parts/InitializeExtensionHost/InitializeExtensionHost.js'

test('initializeExtensionHost should be a function', () => {
  expect(typeof initializeExtensionHost).toBe('function')
})