export interface RestoredState {
  readonly focusedIndex: number
  readonly offset: number
  readonly uri: string
}

const restoreFocusedIndex = (state: unknown): number => {
  if (state && typeof state === 'object' && 'focusedIndex' in state && typeof state.focusedIndex === 'number') {
    return state.focusedIndex
  }
  return -1
}

const restoreOffset = (state: unknown): number => {
  if (state && typeof state === 'object' && 'offset' in state && typeof state.offset === 'number') {
    return state.offset
  }
  return -1
}
const restoreUri = (state: unknown): string => {
  if (state && typeof state === 'object' && 'uri' in state && typeof state.uri === 'string') {
    return state.uri
  }
  return ''
}

export const restoreState = (input: unknown): RestoredState => {
  const focusedIndex = restoreFocusedIndex(input)
  const offset = restoreOffset(input)
  const uri = restoreUri(input)
  return {
    focusedIndex,
    offset,
    uri,
  }
}
