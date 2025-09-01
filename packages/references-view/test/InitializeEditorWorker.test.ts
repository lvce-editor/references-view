import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as EditorWorker from '../src/parts/EditorWorker/EditorWorker.ts'
import { initializeEditorWorker } from '../src/parts/InitializeEditorWorker/InitializeEditorWorker.ts'

test('initializEditorWorker - success', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker'() {},
  })
  await initializeEditorWorker()
  await EditorWorker.dispose()
  expect(mockRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker', expect.anything(), 'HandleMessagePort.handleMessagePort', 0],
  ])
})
