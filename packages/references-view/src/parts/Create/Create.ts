import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import * as ReferencesStates from '../ReferencesStates/ReferencesStates.ts'

export const create = (id: number, uri: string, x: number, y: number, width: number, height: number): void => {
  const state: ReferencesState = {
    collapsedUris: [],
    displayReferences: [],
    fileIconCache: {},
    focusedIndex: -1,
    id,
    languageId: '',
    message: '',
    offset: -1,
    references: [],
    uri: '',
  }
  ReferencesStates.set(id, state, state)
}
