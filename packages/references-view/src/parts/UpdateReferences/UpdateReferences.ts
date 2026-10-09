import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import * as EditorWorker from '../EditorWorker/EditorWorker.ts'
import * as GetDisplayReferences from '../GetDisplayReferences/GetDisplayReferences.ts'
import * as GetReferencesFileCount from '../GetReferencesFileCount/GetReferencesFileCount.ts'
import * as GetReferencesMessage from '../GetReferencesMessage/GetReferencesMessage.ts'
import * as LocationStrings from '../LocationStrings/LocationsStrings.ts'
import * as References from '../References/References.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'
import { requestFileIcons } from '../RequestFileIcons/RequestFileIcons.ts'

export const updateReferences = async (
  state: ReferencesState,
  uri: string,
  languageId: string,
  text: string,
  offset: number,
  position: any,
): Promise<ReferencesState> => {
  const unsupportedUriMessage = GetReferencesMessage.getUnsupportedUriMessage(uri)
  if (unsupportedUriMessage) {
    return {
      ...state,
      displayReferences: [],
      initial: false,
      languageId,
      message: unsupportedUriMessage,
      offset,
      references: [],
      uri,
    }
  }
  const { assetDir, platform } = state
  const providerResult = await References.getReferences2(uri, languageId, text, offset, position, assetDir, platform)
  const { references } = providerResult
  const icons = await requestFileIcons(references)
  const collapsedUris: readonly string[] = []
  const displayReferences = GetDisplayReferences.getDisplayReferences(references, icons, collapsedUris)
  const fileCount = GetReferencesFileCount.getFileCount(references)
  const message = providerResult.found ? GetReferencesMessage.getMessage(references.length, fileCount) : LocationStrings.noReferenceProviderRegistered()
  return {
    ...state,
    displayReferences,
    initial: false,
    languageId,
    message,
    offset,
    references,
    uri,
  }
}

export const updateImplementations = async (state: ReferencesState, implementations: readonly any[]): Promise<ReferencesState> => {
  const icons = await requestFileIcons(implementations)
  const collapsedUris: readonly string[] = []
  const displayReferences = GetDisplayReferences.getDisplayReferences(implementations, icons, collapsedUris)
  const fileCount = GetReferencesFileCount.getFileCount(implementations)
  const message = implementations.length === 0 ? LocationStrings.noImplementationsFound() : GetReferencesMessage.getMessage(implementations.length, fileCount)
  return {
    ...state,
    displayReferences,
    initial: false,
    message,
    references: implementations,
  }
}

export const getAndUpdateReferences = async (state: ReferencesState): Promise<ReferencesState> => {
  // TODO need to wait for editor
  const editorId = await RendererWorker.getActiveEditorId()
  if (editorId === -1) {
    let uri = ''
    try {
      uri = await RendererWorker.getActiveUri()
    } catch {
      // Older renderer workers do not expose the active URI.
    }
    const unsupportedUriMessage = GetReferencesMessage.getUnsupportedUriMessage(uri)
    if (unsupportedUriMessage) {
      return updateReferences(state, uri, '', '', 0, { columnIndex: 0, rowIndex: 0 })
    }
    return {
      ...state,
      initial: false,
      message: 'No Editor found',
    }
  }
  const uri = await EditorWorker.getUri(editorId)
  const languageId = await EditorWorker.getLanguageId(editorId)
  const text = await EditorWorker.getText(editorId)
  const offset = await EditorWorker.getOffsetAtCursor(editorId)
  const position = await EditorWorker.getPositionAtCursor(editorId)
  return updateReferences(state, uri, languageId, text, offset, position)
}
