import type { Reference } from '../Reference/Reference.ts'
import * as EditorWorker from '../EditorWorker/EditorWorker.ts'
import * as ExtensionHostReference from '../ExtensionHostReference/ExtensionHostReference.ts'
import * as GetReferencesWithPreview from '../GetReferencesWithPreview/GetReferencesWithPreview.ts'

export const getReferences = async (editorId: number): Promise<readonly Reference[]> => {
  const offset = await EditorWorker.getOffsetAtCursor(editorId)
  const references = await ExtensionHostReference.executeReferenceProvider(editorId, offset)
  const withPreview = await GetReferencesWithPreview.getReferencesWithPreview(references)
  return withPreview
}
