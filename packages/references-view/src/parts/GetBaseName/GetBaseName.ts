export const getBaseName = (uri: string): string => {
  if (!uri) {
    return ''
  }
  return uri.slice(uri.lastIndexOf('/') + 1)
}
