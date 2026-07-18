import { type Rpc, LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { VError } from '@lvce-editor/verror'
import * as EditorWorker from '../EditorWorker/EditorWorker.ts'

export const createExtensionManagementWorkerRpc = async (): Promise<Rpc> => {
  try {
    const rpc = await LazyTransferMessagePortRpcParent.create({
      commandMap: {},
      send: (port) => EditorWorker.sendMessagePortToExtensionManagementWorker(port),
    })
    return rpc
  } catch (error) {
    throw new VError(error, `Failed to create extension management worker rpc`)
  }
}
