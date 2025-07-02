import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import * as ReferencesStates from '../ReferencesStates/ReferencesStates.ts'

export const createDefaultState = (uid = 0): ReferencesState => {
  const state: ReferencesState = {
    id: uid,
    message: '',
    references: [],
    displayReferences: [],
    focusedIndex: -1,
  }
  ReferencesStates.set(uid, state, state)
  return state
}
