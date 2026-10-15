import { test, expect, jest } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { DisplayReference } from '../src/parts/DisplayReference/DisplayReference.ts'
import type { ReferencesState } from '../src/parts/ReferencesState/ReferencesState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import { selectIndexLead } from '../src/parts/SelectIndexLead/SelectIndexLead.ts'

test('selectIndexLead should update focusedIndex', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.readDirWithFileTypes') {
        return []
      }
      return undefined
    },
  })
  RendererWorker.set(mockRpc)

  const state: ReferencesState = createDefaultState()
  const displayReference: DisplayReference = {
    depth: 0,
    endOffset: undefined,
    icon: 'file',
    index: 0,
    lineText: 'test',
    name: 'test.ts',
    posInSet: 1,
    setSize: 1,
    startOffset: undefined,
    type: 1,
    uri: 'file:///test.ts',
  }

  const newState: ReferencesState = {
    ...state,
    displayReferences: [displayReference],
    references: [{ uri: 'file:///test.ts' }],
  }

  const result = await selectIndexLead(newState, 0)
  expect(result.focusedIndex).toBe(0)
  expect(result.displayReferences).toBe(newState.displayReferences)
})

test('selectIndexLead should preserve other state properties', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.readDirWithFileTypes') {
        return []
      }
      return undefined
    },
  })
  RendererWorker.set(mockRpc)

  const state: ReferencesState = createDefaultState()
  const displayReference: DisplayReference = {
    depth: 0,
    endOffset: undefined,
    icon: 'file',
    index: 0,
    lineText: 'test',
    name: 'test.ts',
    posInSet: 1,
    setSize: 1,
    startOffset: undefined,
    type: 1,
    uri: 'file:///test.ts',
  }

  const newState: ReferencesState = {
    ...state,
    displayReferences: [displayReference],
    focusedIndex: -1,
    references: [{ uri: 'file:///test.ts' }],
  }

  const result = await selectIndexLead(newState, 0)
  expect(result.focusedIndex).toBe(0)
  expect(result.message).toBe(newState.message)
  expect(result.references).toBe(newState.references)
  expect(result.id).toBe(newState.id)
})

test('selectIndexLead ignores a leaf without a corresponding reference', async () => {
  const state = createDefaultState()
  const displayReference: DisplayReference = {
    depth: 2,
    endOffset: undefined,
    icon: '',
    index: 0,
    lineText: '',
    name: '',
    posInSet: 1,
    setSize: 1,
    startOffset: undefined,
    type: 1,
    uri: '',
  }
  const newState: ReferencesState = { ...state, displayReferences: [displayReference] }

  const result = await selectIndexLead(newState, 0)

  expect(result).toBe(newState)
})

test('selectIndexLead opens and selects the reference in its originating application', async () => {
  const invoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly unknown[]) => {
      invoke(method, ...args)
      return undefined
    },
  })
  RendererWorker.set(mockRpc)

  const state: ReferencesState = createDefaultState()
  const newState: ReferencesState = {
    ...state,
    applicationId: 'preview',
    displayReferences: [
      {
        depth: 2,
        endOffset: 11,
        icon: '',
        index: 0,
        lineText: 'let color = blue',
        name: '',
        posInSet: 1,
        setSize: 1,
        startOffset: 4,
        type: 1,
        uri: '',
      },
    ],
    references: [
      {
        endColumnIndex: 9,
        endRowIndex: 0,
        startColumnIndex: 4,
        startRowIndex: 0,
        uri: 'memfs:///preview/example.txt',
      },
    ],
  }

  const result = await selectIndexLead(newState, 0)

  expect(result.focusedIndex).toBe(0)
  expect(invoke.mock.calls).toEqual([
    ['Application.execute', 'preview', 'Main.openUri', 'memfs:///preview/example.txt', true, undefined],
    ['Application.execute', 'preview', 'GetActiveEditor.setSelections', [0, 4, 0, 9]],
  ])
})
