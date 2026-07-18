import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ExtensionManagementReference from '../src/parts/ExtensionManagementReference/ExtensionManagementReference.ts'
import * as ExtensionManagementWorker from '../src/parts/ExtensionManagementWorker/ExtensionManagementWorker.ts'

test('executeReferenceProvider2 activates and queries references through extension management worker', async () => {
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
        return {
          found: true,
          result: [{ id: 1, ref: 'abc' }],
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
  const result = await ExtensionManagementReference.executeReferenceProvider2('file:///test.ts', 'typescript', 42, position, '/assets', 2)

  expect(invocations).toEqual([
    ['Extensions.activateByEvent', 'onReferences:typescript', '/assets', 2],
    [
      'Extensions.executeLanguageProvider',
      'reference',
      'provideReferences',
      {
        languageId: 'typescript',
        uri: 'file:///test.ts',
      },
      42,
      position,
    ],
  ])
  expect(result).toEqual([{ id: 1, ref: 'abc' }])
})

test('executeReferenceProvider2 returns an empty array when no isolated provider is found', async () => {
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

  await expect(ExtensionManagementReference.executeReferenceProvider2('file:///test.ts', 'typescript', 0, {}, '/assets', 2)).resolves.toEqual([])
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

  await expect(ExtensionManagementReference.executeReferenceProvider2('file:///test.ts', 'typescript', 0, {}, '/assets', 2)).rejects.toThrow(
    'Failed to activate reference extension',
  )
})
