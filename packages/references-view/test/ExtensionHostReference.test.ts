import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ExtensionHost from '../src/parts/ExtensionHost/ExtensionHost.ts'
import * as ExtensionHostReference from '../src/parts/ExtensionHostReference/ExtensionHostReference.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

// These tests will just check the return value and call signature, not override imports

test('executeReferenceProvider calls ExtensionHost.invoke with correct parameters', async () => {
  let invokedMethod: string | undefined
  let invokedParams: any[] | undefined

  const mockExtensionHostRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...params: any[]) => {
      invokedMethod = method
      invokedParams = params
      return Promise.resolve([{ id: 1, ref: 'abc' }])
    },
  })

  const mockRendererWorkerRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, event: string) => {
      if (method === 'ExtensionHostManagement.activateByEvent') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })

  ExtensionHost.set(mockExtensionHostRpc)
  RendererWorker.set(mockRendererWorkerRpc)

  const editorId = 123
  const offset = 42
  const result = await ExtensionHostReference.executeReferenceProvider(editorId, offset)

  expect(invokedMethod).toBe('ExtensionHostReference.executeReferenceProvider')
  expect(invokedParams).toEqual([123, 42])
  expect(result).toEqual([{ id: 1, ref: 'abc' }])
})

test('executeFileReferenceProvider calls ExtensionHost.invoke with correct parameters', async () => {
  let invokedMethod: string | undefined
  let invokedParams: any[] | undefined

  const mockExtensionHostRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...params: any[]) => {
      invokedMethod = method
      invokedParams = params
      return Promise.resolve([{ id: 2, ref: 'def' }])
    },
  })

  const mockRendererWorkerRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, event: string) => {
      if (method === 'ExtensionHostManagement.activateByEvent') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })

  ExtensionHost.set(mockExtensionHostRpc)
  RendererWorker.set(mockRendererWorkerRpc)

  const id = 456
  const languageId = 'typescript'
  const result = await ExtensionHostReference.executeFileReferenceProvider(id, languageId)

  expect(invokedMethod).toBe('ExtensionHostReference.executeFileReferenceProvider')
  expect(invokedParams).toEqual([456])
  expect(result).toEqual([{ id: 2, ref: 'def' }])
})
