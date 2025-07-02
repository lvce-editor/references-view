import * as CreateExtensionHostRpc from '../CreateExtensionHostRpc/CreateExtensionHostRpc.ts'
import * as ExtensionHost from '../ExtensionHost/ExtensionHost.ts'

export const initializeExtensionHost = async (): Promise<void> => {
  const rpc = await CreateExtensionHostRpc.createExtensionHostRpc()
  ExtensionHost.set(rpc)
}
