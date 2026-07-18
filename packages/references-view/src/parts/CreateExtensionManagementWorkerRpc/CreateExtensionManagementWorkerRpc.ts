import { type Rpc, LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { VError } from '@lvce-editor/verror'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const createExtensionManagementWorkerRpc = async (): Promise<Rpc> => {
  try {
    const rpc = await LazyTransferMessagePortRpcParent.create({
      commandMap: {},
      send: (port) => RendererWorker.sendMessagePortToExtensionManagementWorker(port, 0),
    })
    return rpc
  } catch (error) {
    throw new VError(error, `Failed to create extension management worker rpc`)
  }
}
