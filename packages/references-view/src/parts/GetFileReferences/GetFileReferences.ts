import { executeFileReferenceProvider } from '../ExtensionHostReference/ExtensionHostReference.ts'

export const getFileReferences = async (id: number, languageId: string): Promise<readonly any[]> => {
  const references = await executeFileReferenceProvider(id, languageId)
  return references
}
