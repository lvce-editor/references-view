import { RendererWorker } from '@lvce-editor/rpc-registry'

export const { set, invoke, activateByEvent, sendMessagePortToEditorWorker, getIcons, getActiveEditorId, sendMessagePortToExtensionHostWorker, readFile, openUri } =
  RendererWorker
