import * as ExtensionHostReference from '../ExtensionHostReference/ExtensionHostReference.ts'

export const getFileReferences = async (id: number, languageId: string): Promise<readonly any[]> => {
  const references = await ExtensionHostReference.executeFileReferenceProvider(id, languageId)
  return references
}
