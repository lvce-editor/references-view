import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import * as EditorWorker from '../EditorWorker/EditorWorker.ts'
import * as GetDisplayReferences from '../GetDisplayReferences/GetDisplayReferences.ts'
import * as GetReferencesFileCount from '../GetReferencesFileCount/GetReferencesFileCount.ts'
import * as GetReferencesMessage from '../GetReferencesMessage/GetReferencesMessage.ts'
import * as References from '../References/References.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'
import { requestFileIcons } from '../RequestFileIcons/RequestFileIcons.ts'

export const loadContent = async (state: ReferencesState): Promise<ReferencesState> => {
  try {
    // TODO need to wait for editor
    const editorId = await RendererWorker.getActiveEditorId()
    if (editorId === -1) {
      return {
        ...state,
        message: 'No Editor found',
      }
    }
    const uri = await EditorWorker.invoke('Editor.getUri', editorId)
    const languageId = await EditorWorker.invoke('Editor.getLanguageId', editorId)
    const offset = await EditorWorker.getOffsetAtCursor(editorId)
    const position = await EditorWorker.getPositionAtCursor(editorId)
    // @ts-ignore
    const references = await References.getReferences2(uri, languageId, offset, position)
    const icons = await requestFileIcons(references)
    const displayReferences = GetDisplayReferences.getDisplayReferences(references, icons)
    const fileCount = GetReferencesFileCount.getFileCount(references)
    const message = GetReferencesMessage.getMessage(references.length, fileCount)
    return {
      ...state,
      references,
      displayReferences,
      message,
      offset,
      uri,
    }
  } catch (error) {
    // TODO send error to error worker
    return {
      ...state,
      message: `${error}`,
    }
  }
}
