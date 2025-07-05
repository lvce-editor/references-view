import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { ReferencesState } from '../src/parts/ReferencesState/ReferencesState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as EditorWorker from '../src/parts/EditorWorker/EditorWorker.ts'
import * as ExtensionHost from '../src/parts/ExtensionHost/ExtensionHost.ts'
import * as LoadContent from '../src/parts/LoadContent/LoadContent.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('loadContent - loads references and updates state', async () => {
  const mockReferences: readonly {
    readonly uri: string
    readonly range: { readonly start: { readonly line: number; readonly character: number }; readonly end: { readonly line: number; readonly character: number } }
  }[] = [
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
      if (method === 'GetActiveEditor.getActiveEditorId') {
        return 1
      }
      if (method === 'Editor.getOffsetAtCursor') {
        return 0
      }
      if (method === 'FileSystem.readFile') {
        return ''
      }
      if (method === 'IconTheme.getIcons') {
        return []
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)
  ExtensionHost.set(mockRpc)
  EditorWorker.set(mockRpc)

  const initialState: ReferencesState = createDefaultState(1)
  const result: ReferencesState = await LoadContent.loadContent(initialState)

  expect(result.id).toBe(1)
  expect(result.references).toEqual([
    {
      lineText: '',
      range: {
        end: {
          character: 10,
          line: 1,
        },
        start: {
          character: 0,
          line: 1,
        },
      },
      uri: 'file:///test1.ts',
    },
    {
      lineText: '',
      range: {
        end: {
          character: 15,
          line: 5,
        },
        start: {
          character: 0,
          line: 5,
        },
      },
      uri: 'file:///test2.ts',
    },
  ])
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
      if (method === 'GetActiveEditor.getActiveEditorId') {
        return 1
      }
      if (method === 'Editor.getOffsetAtCursor') {
        return 0
      }
      if (method === 'FileSystem.readFile') {
        return ''
      }
      if (method === 'IconTheme.getIcons') {
        return []
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)
  ExtensionHost.set(mockRpc)
  EditorWorker.set(mockRpc)

  const initialState: ReferencesState = createDefaultState(2)
  const result: ReferencesState = await LoadContent.loadContent(initialState)

  expect(result.id).toBe(2)
  expect(result.references).toEqual([])
  expect(Array.isArray(result.displayReferences)).toBe(true)
  expect(result.displayReferences.length).toBe(0)
  expect(result.message).toBe('No Results')
  expect(result.focusedIndex).toBe(-1)
})

test('loadContent - preserves existing state properties', async () => {
  const mockReferences: readonly {
    readonly uri: string
    readonly range: { readonly start: { readonly line: number; readonly character: number }; readonly end: { readonly line: number; readonly character: number } }
  }[] = [{ uri: 'file:///test.ts', range: { start: { line: 1, character: 0 }, end: { line: 1, character: 5 } } }]

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
      if (method === 'GetActiveEditor.getActiveEditorId') {
        return 1
      }
      if (method === 'Editor.getOffsetAtCursor') {
        return 0
      }
      if (method === 'FileSystem.readFile') {
        return ''
      }
      if (method === 'IconTheme.getIcons') {
        return []
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)
  ExtensionHost.set(mockRpc)
  EditorWorker.set(mockRpc)

  const initialState: ReferencesState = createDefaultState(3)
  const result: ReferencesState = await LoadContent.loadContent(initialState)

  expect(result.id).toBe(3)
  expect(result.focusedIndex).toBe(-1)
  expect(result.references).toEqual([
    {
      lineText: '',
      range: {
        end: {
          character: 5,
          line: 1,
        },
        start: {
          character: 0,
          line: 1,
        },
      },
      uri: 'file:///test.ts',
    },
  ])
  expect(Array.isArray(result.displayReferences)).toBe(true)
  expect(result.displayReferences.length).toBeGreaterThanOrEqual(mockReferences.length)
  expect(typeof result.message).toBe('string')
})
