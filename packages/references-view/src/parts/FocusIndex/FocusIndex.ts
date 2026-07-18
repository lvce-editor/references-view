import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'

export const focusIndex = (state: ReferencesState, index: number): ReferencesState => {
  const { displayReferences } = state
  if (index < -1 || index >= displayReferences.length) {
    return state
  }
  return {
    ...state,
    focusedIndex: index,
  }
}
