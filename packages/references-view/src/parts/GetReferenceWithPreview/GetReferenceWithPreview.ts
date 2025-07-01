import * as FileSystem from '../FileSystem/FileSystem.ts'
import * as GetLineText from '../GetLineText/GetLineText.ts'

export const getReferenceWithPreview = async (reference: any): Promise<any> => {
  const content = await FileSystem.readFile(reference.uri)
  const lineText = GetLineText.getLineText(content, reference.startRowIndex, reference.startColumnIndex, reference.endRowIndex, reference.endColumnIndex)
  return {
    ...reference,
    lineText,
  }
}
