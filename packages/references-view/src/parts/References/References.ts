import type { Reference } from '../Reference/Reference.ts'
import * as ExtensionManagementReference from '../ExtensionManagementReference/ExtensionManagementReference.ts'
import * as GetReferencesWithPreview from '../GetReferencesWithPreview/GetReferencesWithPreview.ts'

export const getReferences2 = async (
  uri: string,
  languageId: string,
  text: string,
  offset: number,
  position: any,
  assetDir: string,
  platform: number,
): Promise<readonly Reference[]> => {
  const references = await ExtensionManagementReference.executeReferenceProvider2(uri, languageId, text, offset, position, assetDir, platform)
  const withPreview = await GetReferencesWithPreview.getReferencesWithPreview(references)
  return withPreview
}
