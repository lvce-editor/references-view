import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'

export const getUri = (state: ReferencesState, index: number): string => {
  const { displayReferences } = state
  return displayReferences[index]?.uri || ''
}
