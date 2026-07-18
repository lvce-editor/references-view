export const restoreFocusedIndex = (state: unknown): number => {
  if (state && typeof state === 'object' && 'focusedIndex' in state) {
    const { focusedIndex } = state
    if (typeof focusedIndex === 'number') {
      return focusedIndex
    }
  }
  return -1
}
