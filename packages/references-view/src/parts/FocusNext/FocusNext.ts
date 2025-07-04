import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'

export const focusNext = (state: ReferencesState): ReferencesState => {
  if (state.displayReferences.length === 0) {
    return state
  }
  const nextIndex = state.focusedIndex + 1
  if (nextIndex >= state.displayReferences.length) {
    return focusIndex(state, 0)
  }
  return focusIndex(state, nextIndex)
}