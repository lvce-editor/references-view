import { type Rpc, TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { VError } from '@lvce-editor/verror'
import * as SendMessagePortToExtensionHostWorker from '../SendMessagePortToExtensionHostWorker/SendMessagePortToExtensionHostWorker.ts'

export const createExtensionHostRpc = async (): Promise<Rpc> => {
  try {
    const rpc = await TransferMessagePortRpcParent.create({
      commandMap: {},
      send: SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker,
    })
    return rpc
  } catch (error) {
    throw new VError(error, `Failed to create extension host rpc`)
  }
}
