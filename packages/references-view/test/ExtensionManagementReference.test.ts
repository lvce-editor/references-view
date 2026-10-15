import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ExtensionManagementReference from '../src/parts/ExtensionManagementReference/ExtensionManagementReference.ts'
import * as ExtensionManagementWorker from '../src/parts/ExtensionManagementWorker/ExtensionManagementWorker.ts'

test('executeReferenceProvider2 includes the definition when querying references', async () => {
  const invocations: unknown[] = []
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...params: readonly unknown[]) => {
      invocations.push([method, ...params])
      if (method === 'Extensions.activateByEvent') {
        return {
          error: undefined,
          hasActivatedExtensions: true,
        }
      }
      if (method === 'Extensions.executeLanguageProvider') {
        if (params[1] === 'provideDefinition') {
          return {
            found: true,
            result: { endOffset: 11, startOffset: 6, uri: 'file:///test.ts' },
          }
        }
        return {
          found: true,
          result: [
            { endColumnIndex: 11, endRowIndex: 0, startColumnIndex: 6, startRowIndex: 0, uri: 'file:///test.ts' },
            { id: 1, ref: 'abc', uri: 'file:///other.ts' },
          ],
        }
      }
      throw new Error(`unexpected method ${method}`)
    },
  })

  ExtensionManagementWorker.set(mockRpc)

  const position = {
    columnIndex: 2,
    rowIndex: 1,
  }
  const result = await ExtensionManagementReference.executeReferenceProvider2('file:///test.ts', 'typescript', 'const value = 1', 42, position, '/assets', 2)

  expect(invocations).toEqual([
    ['Extensions.activateByEvent', 'onReferences:typescript', '/assets', 2],
    [
      'Extensions.executeLanguageProvider',
      'reference',
      'provideReferences',
      {
        languageId: 'typescript',
        text: 'const value = 1',
        uri: 'file:///test.ts',
      },
      42,
      position,
    ],
    ['Extensions.activateByEvent', 'onDefinition:typescript', '/assets', 2],
    [
      'Extensions.executeLanguageProvider',
      'definition',
      'provideDefinition',
      {
        languageId: 'typescript',
        text: 'const value = 1',
        uri: 'file:///test.ts',
      },
      42,
      position,
    ],
  ])
  expect(result).toEqual({
    found: true,
    references: [
      { endColumnIndex: 11, endRowIndex: 0, startColumnIndex: 6, startRowIndex: 0, uri: 'file:///test.ts' },
      { id: 1, ref: 'abc', uri: 'file:///other.ts' },
    ],
  })
})

test('executeReferenceProvider2 reports when no isolated provider is found', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Extensions.activateByEvent') {
        return {
          error: undefined,
          hasActivatedExtensions: false,
        }
      }
      if (method === 'Extensions.executeLanguageProvider') {
        return {
          found: false,
        }
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ExtensionManagementWorker.set(mockRpc)

  await expect(ExtensionManagementReference.executeReferenceProvider2('file:///test.ts', 'typescript', '', 0, {}, '/assets', 2)).resolves.toEqual({
    found: false,
    references: [],
  })
})

test('executeReferenceProvider2 uses a definition when no reference provider exists', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...params: readonly unknown[]) => {
      if (method === 'Extensions.activateByEvent') {
        return {
          error: undefined,
          hasActivatedExtensions: true,
        }
      }
      if (method === 'Extensions.executeLanguageProvider') {
        if (params[0] === 'reference') return { found: false }
        return {
          found: true,
          result: { endOffset: 5, startOffset: 4, uri: 'file:///test.xyz' },
        }
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ExtensionManagementWorker.set(mockRpc)

  await expect(
    ExtensionManagementReference.executeReferenceProvider2('file:///test.xyz', 'xyz', 'let x\nx', 6, { columnIndex: 0, rowIndex: 1 }, '/assets', 2),
  ).resolves.toEqual({
    found: true,
    references: [
      {
        endColumnIndex: 5,
        endOffset: 5,
        endRowIndex: 0,
        startColumnIndex: 4,
        startOffset: 4,
        startRowIndex: 0,
        uri: 'file:///test.xyz',
      },
    ],
  })
})

test('executeReferenceProvider2 preserves references when the definition is unavailable', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...params: readonly unknown[]) => {
      if (method === 'Extensions.activateByEvent') {
        return {
          error: undefined,
          hasActivatedExtensions: true,
        }
      }
      if (method === 'Extensions.executeLanguageProvider') {
        if (params[0] === 'reference') return { found: true, result: [{ id: 1, uri: 'file:///test.xyz' }] }
        return { found: true, result: undefined }
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ExtensionManagementWorker.set(mockRpc)

  await expect(ExtensionManagementReference.executeReferenceProvider2('file:///test.xyz', 'xyz', '', 0, {}, '/assets', 2)).resolves.toEqual({
    found: true,
    references: [{ id: 1, uri: 'file:///test.xyz' }],
  })
})

test('executeReferenceProvider2 propagates activation errors', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Extensions.activateByEvent') {
        return {
          error: new Error('Failed to activate reference extension'),
          hasActivatedExtensions: false,
        }
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ExtensionManagementWorker.set(mockRpc)

  await expect(ExtensionManagementReference.executeReferenceProvider2('file:///test.ts', 'typescript', '', 0, {}, '/assets', 2)).rejects.toThrow(
    'Failed to activate reference extension',
  )
})
