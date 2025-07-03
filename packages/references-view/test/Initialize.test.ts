import { test, expect, jest } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as EditorWorker from '../src/parts/EditorWorker/EditorWorker.js'
import * as ExtensionHost from '../src/parts/ExtensionHost/ExtensionHost.js'
import { initialize } from '../src/parts/Initialize/Initialize.js'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.js'

test('initialize - success', async () => {
  const mockInvokeRendererWorker = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: () => {},
    invokeAndTransfer: mockInvokeRendererWorker,
  })
  RendererWorker.set(mockRpc)

  await initialize()

  await EditorWorker.dispose()
  await ExtensionHost.dispose()

  expect(mockInvokeRendererWorker).toHaveBeenCalledTimes(2)
  expect(mockInvokeRendererWorker).toHaveBeenNthCalledWith(
    1,
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker',
    expect.anything(),
    'HandleMessagePort.handleMessagePort2',
    55,
  )
  expect(mockInvokeRendererWorker).toHaveBeenNthCalledWith(
    2,
    'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker',
    expect.anything(),
    'HandleMessagePort.handleMessagePort',
    55,
  )
})

test('initialize - editor worker error', async () => {
  const mockInvokeRendererWorker = jest.fn()
  mockInvokeRendererWorker
    .mockResolvedValueOnce(undefined as never) // Extension host succeeds
    .mockRejectedValueOnce(new Error('editor worker error') as never) // Editor worker fails

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: () => {},
    invokeAndTransfer: mockInvokeRendererWorker,
  })
  RendererWorker.set(mockRpc)

  // Should not throw since InitializeEditorWorker catches errors
  await initialize()

  await ExtensionHost.dispose()

  expect(mockInvokeRendererWorker).toHaveBeenCalledTimes(2)
})

test('initialize - extension host error', async () => {
  const mockInvokeRendererWorker = jest.fn()
  mockInvokeRendererWorker
    .mockRejectedValueOnce(new Error('extension host error') as never) // Extension host fails
    .mockResolvedValueOnce(undefined as never) // Editor worker succeeds

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: () => {},
    invokeAndTransfer: mockInvokeRendererWorker,
  })
  RendererWorker.set(mockRpc)

  await expect(initialize()).rejects.toThrow('Failed to create extension host rpc: extension host error')

  await EditorWorker.dispose()

  expect(mockInvokeRendererWorker).toHaveBeenCalledTimes(2)
})

test('initialize - both errors', async () => {
  const mockInvokeRendererWorker = jest.fn()
  mockInvokeRendererWorker
    .mockRejectedValueOnce(new Error('extension host error') as never) // Extension host fails
    .mockRejectedValueOnce(new Error('editor worker error') as never) // Editor worker fails

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: () => {},
    invokeAndTransfer: mockInvokeRendererWorker,
  })
  RendererWorker.set(mockRpc)

  await expect(initialize()).rejects.toThrow('Failed to create extension host rpc: extension host error')

  expect(mockInvokeRendererWorker).toHaveBeenCalledTimes(2)
})
