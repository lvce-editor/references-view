import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ExtensionHost from '../src/parts/ExtensionHost/ExtensionHost.ts'
import { initializeExtensionHost } from '../src/parts/InitializeExtensionHost/InitializeExtensionHost.ts'

test('initializeExtensionHost - success', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker'() {},
  })
  await initializeExtensionHost()
  await ExtensionHost.dispose()
  expect(mockRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker', expect.anything(), 'HandleMessagePort.handleMessagePort2', 0],
  ])
})

test('initializeExtensionHost - error', async () => {
  RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker'() {
      throw new Error('test error')
    },
  })
  await expect(initializeExtensionHost()).rejects.toThrow(new Error('Failed to create extension host rpc: test error'))
})
