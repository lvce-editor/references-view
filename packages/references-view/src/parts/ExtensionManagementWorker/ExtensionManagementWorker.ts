import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'

export const invoke: typeof ExtensionManagementWorker.invoke = (method, ...params) => ExtensionManagementWorker.invoke(method, ...params)

export const set: typeof ExtensionManagementWorker.set = (rpc) => ExtensionManagementWorker.set(rpc)
