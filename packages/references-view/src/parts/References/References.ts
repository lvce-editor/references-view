import { executeReferenceProvider } from '../ExtensionHostReference/ExtensionHostReference.ts'

export const getReferences = async (editor: any): Promise<readonly any[]> => {
  // const rowIndex = editor.selections[0]
  // const columnIndex = editor.selections[1]
  // TODO ask editor worker for current document id and offset
  const offset = -1
  const references = await executeReferenceProvider(editor, offset)
  return references
}
