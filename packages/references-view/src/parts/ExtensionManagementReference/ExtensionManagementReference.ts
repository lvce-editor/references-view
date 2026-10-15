import * as Assert from '../Assert/Assert.ts'
import * as ExecuteProvider from '../ExecuteProvider/ExecuteProvider.ts'

export interface ReferenceProviderResult {
  readonly found: boolean
  readonly references: readonly any[]
}

interface DefinitionLocation {
  readonly endOffset: number
  readonly startOffset: number
  readonly uri: string
}

const getPosition = (text: string, offset: number): { columnIndex: number; rowIndex: number } => {
  const lines = text.slice(0, offset).split('\n')
  return {
    columnIndex: lines.at(-1)!.length,
    rowIndex: lines.length - 1,
  }
}

const toReference = (
  text: string,
  definition: DefinitionLocation,
): {
  endColumnIndex: number
  endOffset: number
  endRowIndex: number
  startColumnIndex: number
  startOffset: number
  startRowIndex: number
  uri: string
} => {
  const start = getPosition(text, definition.startOffset)
  const end = getPosition(text, definition.endOffset)
  return {
    endColumnIndex: end.columnIndex,
    endOffset: definition.endOffset,
    endRowIndex: end.rowIndex,
    startColumnIndex: start.columnIndex,
    startOffset: definition.startOffset,
    startRowIndex: start.rowIndex,
    uri: definition.uri,
  }
}

const isSameReference = (reference: any, definition: ReturnType<typeof toReference>): boolean => {
  if (reference.uri !== definition.uri) return false
  if (typeof reference.startOffset === 'number' && typeof reference.endOffset === 'number') {
    return reference.startOffset === definition.startOffset && reference.endOffset === definition.endOffset
  }
  return (
    reference.startRowIndex === definition.startRowIndex &&
    reference.startColumnIndex === definition.startColumnIndex &&
    reference.endRowIndex === definition.endRowIndex &&
    reference.endColumnIndex === definition.endColumnIndex
  )
}

export const executeReferenceProvider2 = async (
  uri: string,
  languageId: string,
  text: string,
  offset: number,
  position: any,
  assetDir: string,
  platform: number,
): Promise<ReferenceProviderResult> => {
  const providerResult = await ExecuteProvider.executeProvider({
    assetDir,
    event: `onReferences:${languageId}`,
    method: 'provideReferences',
    params: [offset, position],
    platform,
    textDocument: {
      languageId,
      text,
      uri,
    },
  })
  const providerReferences: readonly any[] = []
  let references = providerReferences
  if (providerResult.found) {
    Assert.array(providerResult.result)
    references = providerResult.result as readonly any[]
  }
  const definitionResult = await ExecuteProvider.executeProvider({
    assetDir,
    event: `onDefinition:${languageId}`,
    kind: 'definition',
    method: 'provideDefinition',
    params: [offset, position],
    platform,
    textDocument: {
      languageId,
      text,
      uri,
    },
  })
  const definition = definitionResult.found ? (definitionResult.result as DefinitionLocation | undefined) : undefined
  if (!definition) {
    return {
      found: providerResult.found || definitionResult.found,
      references,
    }
  }
  const definitionReference = toReference(text, definition)
  return {
    found: true,
    references: references.some((reference) => isSameReference(reference, definitionReference)) ? references : [...references, definitionReference],
  }
}
