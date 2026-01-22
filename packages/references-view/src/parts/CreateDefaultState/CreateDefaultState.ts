import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'

export const createDefaultState = (uid = 0): ReferencesState => {
  const state: ReferencesState = {
    assetDir: '',
    collapsedUris: [],
    displayReferences: [],
    fileIconCache: {},
    focusedIndex: -1,
    id: uid,
    initial: false,
    languageId: '',
    message: '',
    offset: -1,
    platform: 0,
    references: [],
    uri: '',
  }
  return state
}
