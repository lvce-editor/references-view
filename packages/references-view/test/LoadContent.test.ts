import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as LoadContent from '../src/parts/LoadContent/LoadContent.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import * as ExtensionHost from '../src/parts/ExtensionHost/ExtensionHost.ts'

test('loadContent - loads references and updates state', async () => {
  const mockReferences = [
    { uri: 'file:///test1.ts', range: { start: { line: 1, character: 0 }, end: { line: 1, character: 10 } } },
    { uri: 'file:///test2.ts', range: { start: { line: 5, character: 0 }, end: { line: 5, character: 15 } } },
  ]

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostManagement.activateByEvent') {
        return
      }
      if (method === 'ExtensionHost.executeProvider') {
        return mockReferences
      }
      if (method === 'ExtensionHostReference.executeReferenceProvider') {
        return mockReferences
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)
  ExtensionHost.set(mockRpc)

  const initialState = createDefaultState(1)
  const result = await LoadContent.loadContent(initialState)

  expect(result.id).toBe(1)
  expect(result.references).toBe(mockReferences)
  expect(Array.isArray(result.displayReferences)).toBe(true)
  expect(result.displayReferences.length).toBeGreaterThanOrEqual(mockReferences.length)
  expect(typeof result.message).toBe('string')
  expect(result.focusedIndex).toBe(-1)
})

test('loadContent - handles empty references', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostManagement.activateByEvent') {
        return
      }
      if (method === 'ExtensionHost.executeProvider') {
        return []
      }
      if (method === 'ExtensionHostReference.executeReferenceProvider') {
        return []
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)
  ExtensionHost.set(mockRpc)

  const initialState = createDefaultState(2)
  const result = await LoadContent.loadContent(initialState)

  expect(result.id).toBe(2)
  expect(result.references).toEqual([])
  expect(Array.isArray(result.displayReferences)).toBe(true)
  expect(result.displayReferences.length).toBe(0)
  expect(result.message).toBe('No Results')
  expect(result.focusedIndex).toBe(-1)
})

test('loadContent - preserves existing state properties', async () => {
  const mockReferences = [
    { uri: 'file:///test.ts', range: { start: { line: 1, character: 0 }, end: { line: 1, character: 5 } } },
  ]

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostManagement.activateByEvent') {
        return
      }
      if (method === 'ExtensionHost.executeProvider') {
        return mockReferences
      }
      if (method === 'ExtensionHostReference.executeReferenceProvider') {
        return mockReferences
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)
  ExtensionHost.set(mockRpc)

  const initialState = createDefaultState(3)
  const result = await LoadContent.loadContent(initialState)

  expect(result.id).toBe(3)
  expect(result.focusedIndex).toBe(-1)
  expect(result.references).toBe(mockReferences)
  expect(Array.isArray(result.displayReferences)).toBe(true)
  expect(result.displayReferences.length).toBeGreaterThanOrEqual(mockReferences.length)
  expect(typeof result.message).toBe('string')
})