import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as EditorWorker from '../src/parts/EditorWorker/EditorWorker.ts'
import { initializeEditorWorker } from '../src/parts/InitializeEditorWorker/InitializeEditorWorker.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('initializEditorWorker - success', async () => {
  const mockInvokeRendererWorker = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: () => {},
    invokeAndTransfer: mockInvokeRendererWorker,
  })
  RendererWorker.set(mockRpc)
  await initializeEditorWorker()
  await EditorWorker.dispose()
  expect(mockInvokeRendererWorker).toHaveBeenCalledTimes(1)
  expect(mockInvokeRendererWorker).toHaveBeenCalledWith(
    'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker',
    expect.anything(),
    'HandleMessagePort.handleMessagePort',
    55,
  )
})
