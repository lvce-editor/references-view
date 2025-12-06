import { RendererWorker } from '@lvce-editor/rpc-registry'

export const { activateByEvent, getActiveEditorId, getIcons, openUri, readFile, sendMessagePortToEditorWorker, sendMessagePortToExtensionHostWorker, set } =
  RendererWorker
