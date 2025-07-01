import * as GetActiveEditor from '../GetActiveEditor/GetActiveEditor.js'
import * as GetReferencesWithPreview from '../GetReferencesWithPreview/GetReferencesWithPreview.js'

export const getReferences = async (): Promise<readonly any[]> => {
  const editor = GetActiveEditor.getActiveEditor()
  return GetReferencesWithPreview.getReferencesWithPreview(editor)
}
