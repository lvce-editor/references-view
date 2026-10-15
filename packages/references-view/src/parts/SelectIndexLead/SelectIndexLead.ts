import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import * as LocationType from '../LocationType/LocationType.ts'
import { openUri, setSelections } from '../RendererWorker/RendererWorker.ts'

export const selectIndexLead = async (state: ReferencesState, index: number): Promise<ReferencesState> => {
  const { applicationId, displayReferences, references } = state
  let referenceIndex = -1
  for (let i = 0; i <= index; i++) {
    if (displayReferences[i].type === LocationType.Leaf) {
      referenceIndex++
    }
  }
  const reference = references[referenceIndex]
  if (!reference) {
    return state
  }
  await openUri(reference.uri, true, undefined, applicationId)
  const { endColumnIndex, endRowIndex, startColumnIndex, startRowIndex } = reference
  if (typeof startRowIndex === 'number' && typeof startColumnIndex === 'number' && typeof endRowIndex === 'number' && typeof endColumnIndex === 'number') {
    await setSelections([startRowIndex, startColumnIndex, endRowIndex, endColumnIndex], applicationId)
  }
  return {
    ...state,
    focusedIndex: index,
  }
}
