import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import * as r from '../ReferencesStates/ReferencesStates.ts'

export const create = (id: number, uri: string, x: number, y: number, width: number, height: number): void => {
  const state: ReferencesState = {
    id,
    message: '',
    rows: [],
  }
  r.set(id, state, state)
}
