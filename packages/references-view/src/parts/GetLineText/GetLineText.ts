import * as Character from '../Character/Character.ts'
import * as GetNewLineIndex from '../GetNewLineIndex/GetNewLineIndex.ts'

export const getLineText = (content: string, startRowIndex: number, startColumnIndex: number, endRowIndex: number, endColumnIndex: number): string => {
  let newLineIndex = 0
  let rowIndex = 0
  while (newLineIndex !== -1) {
    if (rowIndex++ >= startRowIndex) {
      break
    }
    newLineIndex = GetNewLineIndex.getNewLineIndex(content, newLineIndex + 1)
  }
  if (content[newLineIndex] === Character.NewLine) {
    newLineIndex++
  }
  let nextIndex = GetNewLineIndex.getNewLineIndex(content, newLineIndex)
  if (nextIndex === -1) {
    nextIndex = content.length
  }
  const lineText = content.slice(newLineIndex, nextIndex).trim()
  return lineText
}
