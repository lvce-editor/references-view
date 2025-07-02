export const getName = (uri: string): string => {
  if (!uri) {
    return ''
  }
  return uri.slice(uri.lastIndexOf('/') + 1)
}