import { test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import * as SendMessagePortToEditorWorker from '../src/parts/SendMessagePortToEditorWorker/SendMessagePortToEditorWorker.ts'

test('sendMessagePortToEditorWorker sends port to editor worker', async () => {
  const mockRpc = MockRpc.create({
    invoke: (method: string): any => {
      if (method === 'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker') {
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
    invokeAndTransfer: (method: string, port: unknown, command: string, rpcId: unknown): any => {
      if (method === 'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker') {
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)
  // @ts-ignore
  const { port2 } = new MessageChannel()
  await SendMessagePortToEditorWorker.sendMessagePortToEditorWorker(port2)
})
