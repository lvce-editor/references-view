import { WebWorkerRpcClient } from '@lvce-editor/rpc'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const listen = async (): Promise<void> => {
  const rpc = await WebWorkerRpcClient.create({
    commandMap: CommandMap.commandMap,
  })
  Rpc.set(rpc)
}
