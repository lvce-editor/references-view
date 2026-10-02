import { EditorWorker } from '@lvce-editor/rpc-registry'

interface PositionAtCursor {
  readonly columnIndex: number
  readonly rowIndex: number
  readonly x: number
  readonly y: number
}

export const dispose: typeof EditorWorker.dispose = () => EditorWorker.dispose()

export const getLanguageId: typeof EditorWorker.getLanguageId = (editorUid) => EditorWorker.getLanguageId(editorUid)

export const getOffsetAtCursor: typeof EditorWorker.getOffsetAtCursor = (editorId) => EditorWorker.getOffsetAtCursor(editorId)

export const getUri: typeof EditorWorker.getUri = (editorUid) => EditorWorker.getUri(editorUid)

export const sendMessagePortToExtensionManagementWorker: typeof EditorWorker.sendMessagePortToExtensionManagementWorker = (port) =>
  EditorWorker.sendMessagePortToExtensionManagementWorker(port)

export const set: typeof EditorWorker.set = (rpc) => EditorWorker.set(rpc)

export const getPositionAtCursor = (editorId: number): Promise<PositionAtCursor> => {
  return EditorWorker.getPositionAtCursor(editorId)
}

export const getText = (editorId: number): Promise<string> => {
  return EditorWorker.invoke('Editor.getText', editorId)
}
