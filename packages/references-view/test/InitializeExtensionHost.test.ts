import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ExtensionHost from '../src/parts/ExtensionHost/ExtensionHost.ts'
import { initializeExtensionHost } from '../src/parts/InitializeExtensionHost/InitializeExtensionHost.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('initializeExtensionHost - success', async () => {
  const mockInvokeRendererWorker = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: () => {},
    invokeAndTransfer: mockInvokeRendererWorker,
  })
  RendererWorker.set(mockRpc)
  await initializeExtensionHost()
  await ExtensionHost.dispose()
  expect(mockInvokeRendererWorker).toHaveBeenCalledTimes(1)
  expect(mockInvokeRendererWorker).toHaveBeenCalledWith(
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker',
    expect.anything(),
    'HandleMessagePort.handleMessagePort2',
    55,
  )
})

test('initializeExtensionHost - error', async () => {
  const mockInvokeRendererWorker = jest.fn().mockRejectedValue(new Error('test error') as never)
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: () => {},
    invokeAndTransfer: mockInvokeRendererWorker,
  })
  RendererWorker.set(mockRpc)
  await expect(initializeExtensionHost()).rejects.toThrow(new Error('Failed to create extension host rpc: test error'))
})
