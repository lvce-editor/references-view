import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import * as GetDisplayReferences from '../GetDisplayReferences/GetDisplayReferences.ts'
import * as GetReferencesFileCount from '../GetReferencesFileCount/GetReferencesFileCount.ts'
import * as GetReferencesMessage from '../GetReferencesMessage/GetReferencesMessage.ts'
import * as References from '../References/References.ts'

export const loadContent = async (state: ReferencesState): Promise<ReferencesState> => {
  const editor = {}
  const references = await References.getReferences(editor)
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
