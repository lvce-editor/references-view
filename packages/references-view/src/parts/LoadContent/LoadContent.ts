import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'

export const loadContent = async (state: ReferencesState): Promise<ReferencesState> => {
  return {
    ...state,
  }
}
