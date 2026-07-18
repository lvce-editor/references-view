export const restoreOffset = (state: unknown): number => {
  if (state && typeof state === 'object' && 'offset' in state) {
    const { offset } = state
    if (typeof offset === 'number') {
      return offset
    }
  }
  return -1
}
