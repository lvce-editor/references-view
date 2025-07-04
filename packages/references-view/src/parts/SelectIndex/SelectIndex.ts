import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import * as LocationType from '../LocationType/LocationType.ts'
import { selectIndexCollapsed } from '../SelectIndexCollapsed/SelectIndexCollapsed.ts'
import { selectIndexExpanded } from '../SelectIndexExpanded/SelectIndexExpanded.ts'
import { selectIndexLead } from '../SelectIndexLead/SelectIndexLead.ts'

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
