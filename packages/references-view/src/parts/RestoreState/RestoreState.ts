import { restoreFocusedIndex } from '../RestoreFocusedIndex/RestoreFocusedIndex.ts'
import { restoreLanguageId } from '../RestoreLanguageId/RestoreLanguageId.ts'
import { restoreOffset } from '../RestoreOffset/RestoreOffset.ts'
import { restorePosition } from '../RestorePosition/RestorePosition.ts'
import { restoreUri } from '../RestoreUri/RestoreUri.ts'

export interface RestoredState {
  readonly focusedIndex: number
  readonly languageId: string
  readonly offset: number
  readonly position: any
  readonly uri: string
}

export const restoreState = (input: unknown): RestoredState => {
  const focusedIndex = restoreFocusedIndex(input)
  const offset = restoreOffset(input)
  const uri = restoreUri(input)
  const languageId = restoreLanguageId(input)
  const position = restorePosition(input)
  return {
    focusedIndex,
    languageId,
    offset,
    position,
    uri,
  }
}
