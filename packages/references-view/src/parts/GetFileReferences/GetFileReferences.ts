import * as ExtensionHostReference from '../ExtensionHostReference/ExtensionHostReference.ts'

export const getFileReferences = async (id: number, languageId: string, assetDir: string, platform: number): Promise<readonly any[]> => {
  const references = await ExtensionHostReference.executeFileReferenceProvider(id, languageId, assetDir, platform)
  return references
}
