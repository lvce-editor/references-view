import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import * as FileSystem from '../FileSystem/FileSystem.ts'
import { restoreState } from '../RestoreState/RestoreState.ts'
import { getAndUpdateReferences, updateReferences } from '../UpdateReferences/UpdateReferences.ts'

const isMemory = (uri: string): boolean => {
  return uri.startsWith('memfs://')
}

export const loadContent = async (state: ReferencesState, savedState: unknown): Promise<ReferencesState> => {
  try {
    const { languageId, offset, position, uri } = restoreState(savedState)
    if (uri && !isMemory(uri)) {
      const text = await FileSystem.readFile(uri)
      return updateReferences(state, uri, languageId, text, offset, position)
    }
    return getAndUpdateReferences(state)
  } catch (error) {
    // TODO send error to error worker
    return {
      ...state,
      initial: false,
      message: String(error),
    }
  }
}
