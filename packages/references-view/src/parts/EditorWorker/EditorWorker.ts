import { EditorWorker } from '@lvce-editor/rpc-registry'

interface PositionAtCursor {
  readonly columnIndex: number
  readonly rowIndex: number
  readonly x: number
  readonly y: number
}

export const { dispose, getLanguageId, getOffsetAtCursor, getUri, sendMessagePortToExtensionManagementWorker, set } = EditorWorker

export const getPositionAtCursor = (editorId: number): Promise<PositionAtCursor> => {
  return EditorWorker.getPositionAtCursor(editorId)
}

export const getText = (editorId: number): Promise<string> => {
  return EditorWorker.invoke('Editor.getText', editorId)
}
