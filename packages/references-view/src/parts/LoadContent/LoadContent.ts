import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import { getDisplayReferences } from '../GetDisplayReferences/GetDisplayReferences.ts'
import { getFileCount } from '../GetReferencesFileCount/GetReferencesFileCount.ts'
import { getMessage } from '../GetReferencesMessage/GetReferencesMessage.ts'
import { getReferences } from '../References/References.ts'

export const loadContent = async (state: ReferencesState): Promise<ReferencesState> => {
  const editor = {}
  const references = await getReferences(editor)
  const displayReferences = getDisplayReferences(references)
  const fileCount = getFileCount(references)
  const message = getMessage(references.length, fileCount)
  return {
    ...state,
    references,
    displayReferences,
    message,
  }
}
