import * as GetReferenceWithPreview from '../GetReferenceWithPreview/GetReferenceWithPreview.ts'

export const getReferencesWithPreview = async (references: readonly any[], applicationId?: string): Promise<readonly any[]> => {
  const withPreview = await Promise.all(references.map((reference) => GetReferenceWithPreview.getReferenceWithPreview(reference, applicationId)))
  return withPreview
}
