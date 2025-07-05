import { RendererWorker } from '@lvce-editor/rpc-registry'

export const { set, activateByEvent, sendMessagePortToEditorWorker, getIcons, getActiveEditorId, sendMessagePortToExtensionHostWorker, readFile, openUri } =
  RendererWorker
