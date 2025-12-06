import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'

export const createDefaultState = (uid = 0): ReferencesState => {
  const state: ReferencesState = {
    collapsedUris: [],
    displayReferences: [],
    fileIconCache: {},
    focusedIndex: -1,
    id: uid,
    languageId: '',
    message: '',
    offset: -1,
    references: [],
    uri: '',
  }
  return state
}
