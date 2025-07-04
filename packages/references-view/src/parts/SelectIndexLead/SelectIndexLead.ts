import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import { getUri } from '../GetUri/GetUri.ts'
import { openUri } from '../RendererWorker/RendererWorker.ts'

export const selectIndexLead = async (state: ReferencesState, index: number): Promise<ReferencesState> => {
  const uri = getUri(state, index)
  // TODO open file and jump to line
  await openUri(uri)
  return {
    ...state,
    focusedIndex: index,
  }
}
