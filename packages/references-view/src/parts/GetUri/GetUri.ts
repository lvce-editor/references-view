import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'

export const getUri = (state: ReferencesState, index: number): string => {
  return state.displayReferences[index]?.uri || ''
}
