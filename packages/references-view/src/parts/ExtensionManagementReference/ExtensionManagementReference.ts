import * as Assert from '../Assert/Assert.ts'
import * as ExecuteProvider from '../ExecuteProvider/ExecuteProvider.ts'

export interface ReferenceProviderResult {
  readonly found: boolean
  readonly references: readonly any[]
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
  if (!providerResult.found) {
    return {
      found: false,
      references: [],
    }
  }
  Assert.array(providerResult.result)
  return {
    found: true,
    references: providerResult.result as readonly any[],
  }
}
