import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import { selectIndex } from '../SelectIndex/SelectIndex.ts'

export const handleClickReference = async (state: ReferencesState, dataIndex: string): Promise<ReferencesState> => {
  const index = Number.parseInt(dataIndex, 10)
  if (Number.isNaN(index)) {
    return state
  }
  return await selectIndex(state, index)
}
