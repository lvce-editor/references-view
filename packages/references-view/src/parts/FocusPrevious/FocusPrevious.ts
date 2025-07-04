import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'

export const focusPrevious = (state: ReferencesState): ReferencesState => {
  if (state.displayReferences.length === 0) {
    return state
  }
  const prevIndex = state.focusedIndex - 1
  if (prevIndex < 0) {
    return focusIndex(state, state.displayReferences.length - 1)
  }
  return focusIndex(state, prevIndex)
}