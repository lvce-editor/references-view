import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import * as SendMessagePortToEditorWorker from '../src/parts/SendMessagePortToEditorWorker/SendMessagePortToEditorWorker.ts'

test('sendMessagePortToEditorWorker sends port to editor worker', async () => {
  const invoke = jest.fn()
  const invokeAndTransfer = jest.fn()
  const mockRpc = MockRpc.create({
    invoke: (method: string): any => {
      invoke(method)
      if (method === 'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker') {
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
    invokeAndTransfer: (method: string, port: unknown, command: string, rpcId: unknown): any => {
      invokeAndTransfer(method, port, command, rpcId)
      if (method === 'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker') {
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)
  // @ts-ignore
  const { port2 } = new MessageChannel()
  await SendMessagePortToEditorWorker.sendMessagePortToEditorWorker(port2, 0)

  expect(invoke).toHaveBeenCalledTimes(0)
  expect(invokeAndTransfer).toHaveBeenCalledTimes(1)
  expect(invokeAndTransfer).toHaveBeenCalledWith('SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker', port2, 'HandleMessagePort.handleMessagePort', 0)
})
