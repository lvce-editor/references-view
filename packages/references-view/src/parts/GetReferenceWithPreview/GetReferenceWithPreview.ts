import * as FileSystem from '../FileSystem/FileSystem.ts'
import * as GetLineText from '../GetLineText/GetLineText.ts'

export const getReferenceWithPreview = async (reference: any, applicationId?: string): Promise<any> => {
  const content = await FileSystem.readFile(reference.uri, applicationId)
  const lineText = GetLineText.getLineText(content, reference.startRowIndex, reference.startColumnIndex, reference.endRowIndex, reference.endColumnIndex)
  return {
    ...reference,
    lineText,
  }
}
