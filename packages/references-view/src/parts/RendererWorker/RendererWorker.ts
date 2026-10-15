import type { Rpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'

type RendererMessagePort = Parameters<typeof RendererWorker.sendMessagePortToEditorWorker>[0]

export const getActiveEditorId = (applicationId?: string): Promise<number> => RendererWorker.invoke('GetActiveEditor.getActiveEditorId', applicationId)

export const getActiveUri = (applicationId?: string): Promise<string> => RendererWorker.invoke('GetActiveEditor.getActiveUri', applicationId)

export const getIcons = (requests: readonly unknown[]): Promise<readonly string[]> => RendererWorker.getIcons(requests)

export const openUri = (uri: string, focus?: boolean, options?: unknown, applicationId?: string): Promise<void> => {
  if (applicationId) {
    return RendererWorker.invoke('Application.execute', applicationId, 'Main.openUri', uri, focus, options)
  }
  return RendererWorker.openUri(uri, focus, options)
}

export const readFile = (uri: string, applicationId?: string): Promise<string> => {
  if (applicationId) {
    return RendererWorker.invoke('Application.execute', applicationId, 'FileSystem.readFile', uri)
  }
  return RendererWorker.readFile(uri)
}

export const setSelections = (selections: readonly number[], applicationId?: string): Promise<void> => {
  if (applicationId) {
    return RendererWorker.invoke('Application.execute', applicationId, 'GetActiveEditor.setSelections', selections)
  }
  return RendererWorker.invoke('GetActiveEditor.setSelections', selections)
}

export const sendMessagePortToEditorWorker = (port: RendererMessagePort, rpcId: number): Promise<void> => RendererWorker.sendMessagePortToEditorWorker(port, rpcId)

export const set = (rpc: Rpc): void => {
  RendererWorker.set(rpc)
}
