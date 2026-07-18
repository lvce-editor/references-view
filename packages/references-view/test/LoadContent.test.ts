import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { ReferencesState } from '../src/parts/ReferencesState/ReferencesState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as EditorWorker from '../src/parts/EditorWorker/EditorWorker.ts'
import * as ExtensionManagementWorker from '../src/parts/ExtensionManagementWorker/ExtensionManagementWorker.ts'
import * as LoadContent from '../src/parts/LoadContent/LoadContent.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('loadContent - loads references and updates state', async () => {
  const mockReferences: readonly {
    readonly uri: string
    readonly range: { readonly start: { readonly line: number; readonly character: number }; readonly end: { readonly line: number; readonly character: number } }
  }[] = [
    { range: { end: { character: 10, line: 1 }, start: { character: 0, line: 1 } }, uri: 'file:///test1.ts' },
    { range: { end: { character: 15, line: 5 }, start: { character: 0, line: 5 } }, uri: 'file:///test2.ts' },
  ]

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Extensions.activateByEvent') {
        return { error: undefined, hasActivatedExtensions: true }
      }
      if (method === 'Extensions.executeLanguageProvider') {
        return { found: true, result: mockReferences }
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
      if (method === 'Editor.getUri') {
        return ''
      }
      if (method === 'Editor.getLanguageId') {
        return 'test'
      }
      if (method === 'Editor.getPositionAtCursor') {
        return {
          columnIndex: 0,
          rowIndex: 0,
        }
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)
  ExtensionManagementWorker.set(mockRpc)
  EditorWorker.set(mockRpc)

  const initialState: ReferencesState = createDefaultState(1)
  const result: ReferencesState = await LoadContent.loadContent(initialState, {})

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
      if (method === 'Extensions.activateByEvent') {
        return { error: undefined, hasActivatedExtensions: true }
      }
      if (method === 'Extensions.executeLanguageProvider') {
        return { found: true, result: [] }
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
      if (method === 'Editor.getUri') {
        return ''
      }
      if (method === 'Editor.getLanguageId') {
        return 'test'
      }
      if (method === 'Editor.getPositionAtCursor') {
        return {
          columnIndex: 0,
          rowIndex: 0,
        }
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)
  ExtensionManagementWorker.set(mockRpc)
  EditorWorker.set(mockRpc)

  const initialState: ReferencesState = createDefaultState(2)
  const result: ReferencesState = await LoadContent.loadContent(initialState, {})

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
  }[] = [{ range: { end: { character: 5, line: 1 }, start: { character: 0, line: 1 } }, uri: 'file:///test.ts' }]

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Extensions.activateByEvent') {
        return { error: undefined, hasActivatedExtensions: true }
      }
      if (method === 'Extensions.executeLanguageProvider') {
        return { found: true, result: mockReferences }
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
      if (method === 'Editor.getUri') {
        return ''
      }
      if (method === 'Editor.getLanguageId') {
        return 'test'
      }
      if (method === 'Editor.getPositionAtCursor') {
        return {
          columnIndex: 0,
          rowIndex: 0,
        }
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)
  ExtensionManagementWorker.set(mockRpc)
  EditorWorker.set(mockRpc)

  const initialState: ReferencesState = createDefaultState(3)
  const result: ReferencesState = await LoadContent.loadContent(initialState, {})

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

test('loadContent - restores references for a saved file', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Extensions.activateByEvent') {
        return { error: undefined, hasActivatedExtensions: true }
      }
      if (method === 'Extensions.executeLanguageProvider') {
        return { found: true, result: [] }
      }
      if (method === 'IconTheme.getIcons') {
        return []
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)
  ExtensionManagementWorker.set(mockRpc)

  const result = await LoadContent.loadContent(createDefaultState(4), {
    language: 'typescript',
    offset: 3,
    position: {
      columnIndex: 3,
      rowIndex: 0,
    },
    uri: 'file:///test.ts',
  })

  expect(result).toMatchObject({
    id: 4,
    languageId: 'typescript',
    message: 'No Results',
    offset: 3,
    references: [],
    uri: 'file:///test.ts',
  })
})

test('loadContent - reports when there is no active editor', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'GetActiveEditor.getActiveEditorId') {
        return -1
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const result = await LoadContent.loadContent(createDefaultState(5), {})

  expect(result).toMatchObject({
    id: 5,
    initial: false,
    message: 'No Editor found',
  })
})
