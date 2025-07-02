import { test, expect } from '@jest/globals'
import * as InitializeEditorWorker from '../src/parts/InitializeEditorWorker/InitializeEditorWorker.js'

test('initializeEditorWorker should be a function', () => {
  expect(typeof InitializeEditorWorker.initializeEditorWorker).toBe('function')
})

test('initializeEditorWorker should not throw when called', async () => {
  await expect(InitializeEditorWorker.initializeEditorWorker()).resolves.not.toThrow()
})