import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const diffType = DiffType.RenderItems

export const isEqual = (oldState: ReferencesState, newState: ReferencesState): boolean => {
  return oldState.references === newState.references && oldState.displayReferences === newState.displayReferences && oldState.message === newState.message
}
