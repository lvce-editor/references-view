import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import * as GetDisplayReferences from '../GetDisplayReferences/GetDisplayReferences.ts'
import * as GetReferencesFileCount from '../GetReferencesFileCount/GetReferencesFileCount.ts'
import * as GetReferencesMessage from '../GetReferencesMessage/GetReferencesMessage.ts'
import * as References from '../References/References.ts'

export const loadContent = async (state: ReferencesState): Promise<ReferencesState> => {
  const editorId = -1
  const references = await References.getReferences(editorId)
  const displayReferences = GetDisplayReferences.getDisplayReferences(references)
  const fileCount = GetReferencesFileCount.getFileCount(references)
  const message = GetReferencesMessage.getMessage(references.length, fileCount)
  return {
    ...state,
    references,
    displayReferences,
    message,
  }
}
