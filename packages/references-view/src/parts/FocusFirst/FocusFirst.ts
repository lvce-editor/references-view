import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'

export const focusFirst = (state: ReferencesState): ReferencesState => {
  if (state.displayReferences.length === 0) {
    return focusIndex(state, -1)
  }
  return focusIndex(state, 0)
}