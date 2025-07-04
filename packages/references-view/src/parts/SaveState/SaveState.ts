import type { SavedState } from '../SavedState/SavedState.ts'
import * as r from '../ReferencesStates/ReferencesStates.ts'

export const saveState = (id: number): SavedState => {
  const { newState } = r.get(id)
  const { message, focusedIndex } = newState
  return {
    message,
    focusedIndex,
  }
}
