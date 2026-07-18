export const restorePosition = (state: unknown): any => {
  if (state && typeof state === 'object' && 'position' in state) {
    const { position } = state
    if (typeof position === 'object') {
      return position
    }
  }
  return {}
}
