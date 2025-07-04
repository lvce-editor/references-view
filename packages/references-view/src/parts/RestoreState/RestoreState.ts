import type { SavedState } from '../SavedState/SavedState.ts'

export interface RestoredState {
  readonly focusedIndex: number
}

export const restoreState = (input: unknown): RestoredState => {
  if (typeof input === 'object' && input !== null) {
    const savedState = input as SavedState
    return {
      focusedIndex: savedState.focusedIndex ?? -1,
    }
  }
  return {
    focusedIndex: -1,
  }
}