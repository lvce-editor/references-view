export interface RestoredState {
  readonly focusedIndex: number
  readonly languageId: string
  readonly offset: number
  readonly position: any
  readonly uri: string
}

const restoreFocusedIndex = (state: unknown): number => {
  if (state && typeof state === 'object' && 'focusedIndex' in state) {
    const { focusedIndex } = state
    if (typeof focusedIndex === 'number') {
      return focusedIndex
    }
  }
  return -1
}

const restoreOffset = (state: unknown): number => {
  if (state && typeof state === 'object' && 'offset' in state) {
    const { offset } = state
    if (typeof offset === 'number') {
      return offset
    }
  }
  return -1
}
const restoreUri = (state: unknown): string => {
  if (state && typeof state === 'object' && 'uri' in state) {
    const { uri } = state
    if (typeof uri === 'string') {
      return uri
    }
  }
  return ''
}

const restoreLanguageId = (state: unknown): string => {
  if (state && typeof state === 'object' && 'language' in state) {
    const { language } = state
    if (typeof language === 'string') {
      return language
    }
  }
  return ''
}

const restorePosition = (state: unknown): any => {
  if (state && typeof state === 'object' && 'position' in state) {
    const { position } = state
    if (typeof position === 'object') {
      return position
    }
  }
  return {}
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
