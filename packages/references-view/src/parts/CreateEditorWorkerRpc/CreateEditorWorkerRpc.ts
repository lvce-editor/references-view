import { type Rpc, TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { VError } from '@lvce-editor/verror'
import * as SendMessagePortToEditorWorker from '../SendMessagePortToEditorWorker/SendMessagePortToEditorWorker.ts'

export const createEditorWorkerRpc = async (): Promise<Rpc> => {
  try {
    const rpc = await TransferMessagePortRpcParent.create({
      commandMap: {},
      send: SendMessagePortToEditorWorker.sendMessagePortToEditorWorker,
    })
    return rpc
  } catch (error) {
    throw new VError(error, `Failed to create editor worker rpc`)
  }
}
