import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'

export const selectIndexCollapsed = (state: ReferencesState, index: number): ReferencesState => {
  // TODO collapse

  return { ...state, focusedIndex: index }
}