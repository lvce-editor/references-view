import type { Rpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'

type RendererMessagePort = Parameters<typeof RendererWorker.sendMessagePortToEditorWorker>[0]

export const getActiveEditorId = (): Promise<number> => RendererWorker.getActiveEditorId()

export const getIcons = (requests: readonly unknown[]): Promise<readonly string[]> => RendererWorker.getIcons(requests)

export const openUri = (uri: string, focus?: boolean, options?: unknown): Promise<void> => RendererWorker.openUri(uri, focus, options)

export const readFile = (uri: string): Promise<string> => RendererWorker.readFile(uri)

export const sendMessagePortToEditorWorker = (port: RendererMessagePort, rpcId: number): Promise<void> => RendererWorker.sendMessagePortToEditorWorker(port, rpcId)

export const set = (rpc: Rpc): void => {
  RendererWorker.set(rpc)
}
