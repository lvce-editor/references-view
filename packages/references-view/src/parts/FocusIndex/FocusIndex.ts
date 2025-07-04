import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'

export const focusIndex = (state: ReferencesState, index: number): ReferencesState => {
  if (index < -1 || index >= state.displayReferences.length) {
    return state
  }
  return {
    ...state,
    focusedIndex: index,
  }
}