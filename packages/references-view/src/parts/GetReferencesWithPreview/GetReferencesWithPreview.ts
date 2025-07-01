import * as GetReferenceWithPreview from '../GetReferenceWithPreview/GetReferenceWithPreview.js'
import * as References from '../References/References.ts'

export const getReferencesWithPreview = async (editor: any): Promise<readonly any[]> => {
  const references = await References.getReferences(editor)
  const withPreview = await Promise.all(references.map(GetReferenceWithPreview.getReferenceWithPreview))
  return withPreview
}
