import * as GetReferenceWithPreview from '../GetReferenceWithPreview/GetReferenceWithPreview.ts'

export const getReferencesWithPreview = async (references: readonly any[]): Promise<readonly any[]> => {
  const withPreview = await Promise.all(references.map(GetReferenceWithPreview.getReferenceWithPreview))
  return withPreview
}
