import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import * as FileSystem from '../FileSystem/FileSystem.ts'
import * as LocationStrings from '../LocationStrings/LocationsStrings.ts'
import { restoreState } from '../RestoreState/RestoreState.ts'
import { getAndUpdateReferences, updateReferences } from '../UpdateReferences/UpdateReferences.ts'

const isMemory = (uri: string): boolean => {
  return uri.startsWith('memfs://')
}

const isNoReferenceProviderError = (error: unknown): boolean => {
  return String(error).includes('No reference provider found')
}

export const loadContent = async (state: ReferencesState, savedState: unknown): Promise<ReferencesState> => {
  try {
    const { languageId, offset, position, uri } = restoreState(savedState)
    if (uri && !isMemory(uri)) {
      const text = await FileSystem.readFile(uri)
      return await updateReferences(state, uri, languageId, text, offset, position)
    }
    return await getAndUpdateReferences(state)
  } catch (error) {
    if (!isNoReferenceProviderError(error)) {
      throw error instanceof Error ? error : new Error(String(error))
    }
    return {
      ...state,
      initial: false,
      message: LocationStrings.noReferenceProviderRegistered(),
    }
  }
}
