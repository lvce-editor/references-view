import { test, expect } from '@jest/globals'
import * as InitializeExtensionHost from '../src/parts/InitializeExtensionHost/InitializeExtensionHost.js'

test('initializeExtensionHost should be a function', () => {
  expect(typeof InitializeExtensionHost.initializeExtensionHost).toBe('function')
})