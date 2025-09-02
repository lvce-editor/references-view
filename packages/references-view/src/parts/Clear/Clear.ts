import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'

export const clear = (state: ReferencesState): ReferencesState => {
  return {
    ...state,
    references: [],
    displayReferences: [],
    message: 'No Results',
  }
}
