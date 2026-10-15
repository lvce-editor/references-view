import type { Reference } from '../Reference/Reference.ts'
import * as ExtensionManagementReference from '../ExtensionManagementReference/ExtensionManagementReference.ts'
import * as GetReferencesWithPreview from '../GetReferencesWithPreview/GetReferencesWithPreview.ts'

interface ReferencesResult {
  readonly found: boolean
  readonly references: readonly Reference[]
}

export const getReferences2 = async (
  uri: string,
  languageId: string,
  text: string,
  offset: number,
  position: any,
  assetDir: string,
  platform: number,
  applicationId?: string,
): Promise<ReferencesResult> => {
  const providerResult = await ExtensionManagementReference.executeReferenceProvider2(uri, languageId, text, offset, position, assetDir, platform, applicationId)
  const references = await GetReferencesWithPreview.getReferencesWithPreview(providerResult.references, applicationId)
  return {
    found: providerResult.found,
    references,
  }
}
