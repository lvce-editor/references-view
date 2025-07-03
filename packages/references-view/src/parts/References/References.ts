import * as ExtensionHostReference from '../ExtensionHostReference/ExtensionHostReference.ts'

export const getReferences = async (editorId: number): Promise<readonly any[]> => {
  // const rowIndex = editor.selections[0]
  // const columnIndex = editor.selections[1]
  // TODO ask editor worker for current document id and offset
  const offset = -1
  const references = await ExtensionHostReference.executeReferenceProvider(editorId, offset)
  return references
}
