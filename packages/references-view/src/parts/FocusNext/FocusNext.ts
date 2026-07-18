import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'

export const focusNext = (state: ReferencesState): ReferencesState => {
  const { displayReferences, focusedIndex } = state
  if (displayReferences.length === 0) {
    return state
  }
  const nextIndex = focusedIndex + 1
  if (nextIndex >= displayReferences.length) {
    return focusIndex(state, 0)
  }
  return focusIndex(state, nextIndex)
}
