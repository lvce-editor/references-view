import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'

export const createDefaultState = (uid = 0): ReferencesState => {
  const state: ReferencesState = {
    id: uid,
    message: '',
    references: [],
    displayReferences: [],
    focusedIndex: -1,
    fileIconCache: {},
    offset: -1,
    uri: '',
    languageId: '',
    collapsedUris: [],
  }
  return state
}
