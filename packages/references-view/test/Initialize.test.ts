import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as EditorWorker from '../src/parts/EditorWorker/EditorWorker.js'
import * as ExtensionHost from '../src/parts/ExtensionHost/ExtensionHost.js'
import { initialize } from '../src/parts/Initialize/Initialize.js'

test('initialize - success', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker'() {},
    'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker'() {},
  })
  RendererWorker.set(mockRpc)

  await initialize()

  await EditorWorker.dispose()
  await ExtensionHost.dispose()

  expect(mockRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker', expect.any(Object), 'HandleMessagePort.handleMessagePort2', 0],
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker', expect.any(Object), 'HandleMessagePort.handleMessagePort', 0],
  ])
})

test('initialize - editor worker error', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker'() {},
    'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker'() {
      throw new Error('editor worker error')
    },
  })
  await initialize()
  await ExtensionHost.dispose()
  expect(mockRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker', expect.any(Object), 'HandleMessagePort.handleMessagePort2', 0],
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker', expect.any(Object), 'HandleMessagePort.handleMessagePort', 0],
  ])
})

test('initialize - extension host error', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker'() {
      throw new Error('extension host error')
    },
    'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker'() {},
  })
  await expect(initialize()).rejects.toThrow('Failed to create extension host rpc: extension host error')

  await EditorWorker.dispose()
  expect(mockRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker', expect.any(Object), 'HandleMessagePort.handleMessagePort2', 0],
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker', expect.any(Object), 'HandleMessagePort.handleMessagePort', 0],
  ])
})

test('initialize - both errors', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker'() {
      throw new Error('extension host error')
    },
    'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker'() {
      throw new Error('editor worker error')
    },
  })
  await expect(initialize()).rejects.toThrow('Failed to create extension host rpc: extension host error')
  expect(mockRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker', expect.any(Object), 'HandleMessagePort.handleMessagePort2', 0],
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker', expect.any(Object), 'HandleMessagePort.handleMessagePort', 0],
  ])
})
