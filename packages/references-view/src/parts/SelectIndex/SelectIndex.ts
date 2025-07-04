import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import * as LocationType from '../LocationType/LocationType.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

const getUri = (state: ReferencesState, index: number): string => {
  return state.displayReferences[index]?.uri || ''
}

const selectIndexLead = async (state: ReferencesState, index: number): Promise<ReferencesState> => {
  const uri = getUri(state, index)
  // TODO open file and jump to line
  RendererWorker.openUri(uri)
  // await Command.execute(/* Main.openUri */ 'Main.openUri', /* uri */ uri)
  return {
    ...state,
    focusedIndex: index,
  }
}

const selectIndexExpanded = (state: ReferencesState, index: number): ReferencesState => {
  // TODO expand

  return { ...state, focusedIndex: index }
}

const selectIndexCollapsed = (state: ReferencesState, index: number): ReferencesState => {
  // TODO collapse

  return { ...state, focusedIndex: index }
}

export const selectIndex = async (state: ReferencesState, index: number): Promise<ReferencesState> => {
  if (index < 0 || index >= state.displayReferences.length) {
    return state
  }

  const displayReference = state.displayReferences[index]
  switch (displayReference.type) {
    case LocationType.Leaf:
      return await selectIndexLead(state, index)
    case LocationType.Expanded:
      return selectIndexExpanded(state, index)
    case LocationType.Collapsed:
      return selectIndexCollapsed(state, index)
    default:
      return state
  }
}
