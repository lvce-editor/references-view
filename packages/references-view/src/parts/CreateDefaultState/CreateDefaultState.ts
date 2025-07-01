import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import { set } from '../ReferencesStates/ReferencesStates.ts'

export const createDefaultState = (uid = 0): ReferencesState => {
  const state: ReferencesState = {
    id: uid,
    message: '',
    rows: [],
  }
  set(uid, state, state)
  return state
}
