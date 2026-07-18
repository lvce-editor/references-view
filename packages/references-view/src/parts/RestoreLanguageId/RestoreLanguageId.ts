export const restoreLanguageId = (state: unknown): string => {
  if (state && typeof state === 'object' && 'language' in state) {
    const { language } = state
    if (typeof language === 'string') {
      return language
    }
  }
  return ''
}
