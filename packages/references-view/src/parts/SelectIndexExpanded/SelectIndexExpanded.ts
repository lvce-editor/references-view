import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'

export const selectIndexExpanded = (state: ReferencesState, index: number): ReferencesState => {
  // TODO expand

  return { ...state, focusedIndex: index }
}