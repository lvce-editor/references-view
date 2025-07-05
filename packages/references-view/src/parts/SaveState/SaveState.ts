import type { SavedState } from '../SavedState/SavedState.ts'
import * as ReferencesStates from '../ReferencesStates/ReferencesStates.ts'

export const saveState = (id: number): SavedState => {
  const { newState } = ReferencesStates.get(id)
  const { message, focusedIndex, offset } = newState
  return {
    message,
    focusedIndex,
    offset,
  }
}
