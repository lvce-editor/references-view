import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'

export const focusLast = (state: ReferencesState): ReferencesState => {
  const { displayReferences } = state
  if (displayReferences.length === 0) {
    return focusIndex(state, -1)
  }
  return focusIndex(state, displayReferences.length - 1)
}
