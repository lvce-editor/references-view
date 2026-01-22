import type { Reference } from '../Reference/Reference.ts'
import * as ExtensionHostReference from '../ExtensionHostReference/ExtensionHostReference.ts'
import * as GetReferencesWithPreview from '../GetReferencesWithPreview/GetReferencesWithPreview.ts'

export const getReferences = async (editorId: number, offset: number, assetDir: string, platform: number): Promise<readonly Reference[]> => {
  const references = await ExtensionHostReference.executeReferenceProvider(editorId, offset, assetDir, platform)
  const withPreview = await GetReferencesWithPreview.getReferencesWithPreview(references)
  return withPreview
}

export const getReferences2 = async (
  uri: string,
  languageId: string,
  offset: number,
  position: any,
  assetDir: string,
  platform: number,
): Promise<readonly Reference[]> => {
  const references = await ExtensionHostReference.executeReferenceProvider2(uri, languageId, offset, position, assetDir, platform)
  const withPreview = await GetReferencesWithPreview.getReferencesWithPreview(references)
  return withPreview
}
