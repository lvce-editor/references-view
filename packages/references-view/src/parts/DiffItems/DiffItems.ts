import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'

export const isEqual = (oldState: ReferencesState, newState: ReferencesState): boolean => {
  return (
    oldState.editorFound === newState.editorFound &&
    oldState.references === newState.references &&
    oldState.displayReferences === newState.displayReferences &&
    oldState.message === newState.message
  )
}
