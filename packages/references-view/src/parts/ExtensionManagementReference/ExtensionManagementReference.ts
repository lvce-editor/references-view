import * as Assert from '../Assert/Assert.ts'
import * as ExecuteProvider from '../ExecuteProvider/ExecuteProvider.ts'

export const executeReferenceProvider2 = async (
  uri: string,
  languageId: string,
  offset: number,
  position: any,
  assetDir: string,
  platform: number,
): Promise<readonly any[]> => {
  const result = await ExecuteProvider.executeProvider({
    assetDir,
    event: `onReferences:${languageId}`,
    method: 'provideReferences',
    params: [offset, position],
    platform,
    textDocument: {
      languageId,
      uri,
    },
  })
  Assert.array(result)
  return result
}
