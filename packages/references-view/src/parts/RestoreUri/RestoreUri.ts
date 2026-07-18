export const restoreUri = (state: unknown): string => {
  if (state && typeof state === 'object' && 'uri' in state) {
    const { uri } = state
    if (typeof uri === 'string') {
      return uri
    }
  }
  return ''
}
