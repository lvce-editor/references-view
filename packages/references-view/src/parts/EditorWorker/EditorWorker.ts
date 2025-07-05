import { EditorWorker } from '@lvce-editor/rpc-registry'

export const { invoke, set, dispose, getOffsetAtCursor, getPositionAtCursor, getLanguageId, getUri } = EditorWorker
