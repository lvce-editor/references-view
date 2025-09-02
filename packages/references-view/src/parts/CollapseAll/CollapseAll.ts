import type { Reference } from '../Reference/Reference.ts'
import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'

const getUri = (reference: Reference): string => {
  return reference.uri
}

export const collapseAll = async (state: ReferencesState): Promise<ReferencesState> => {
  const { references } = state
  const uris = references.map(getUri)
  return {
    ...state,
    collapsedUris: uris,
  }
}
