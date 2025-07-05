import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import { restoreState } from '../RestoreState/RestoreState.ts'
import { getAndUpdateReferences, updateReferences } from '../UpdateReferences/UpdateReferences.ts'

export const loadContent = async (state: ReferencesState, savedState: unknown): Promise<ReferencesState> => {
  try {
    const { uri, offset, languageId, position } = restoreState(savedState)
    if (uri) {
      return updateReferences(state, uri, languageId, offset, position)
    }
    return getAndUpdateReferences(state)
  } catch (error) {
    // TODO send error to error worker
    return {
      ...state,
      message: `${error}`,
    }
  }
}
