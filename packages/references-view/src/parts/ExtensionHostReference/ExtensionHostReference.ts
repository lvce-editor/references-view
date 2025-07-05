import * as Assert from '../Assert/Assert.ts'
import * as ExecuteProvider from '../ExecuteProvider/ExecuteProvider.ts'
import * as ExtensionHostActivationEvent from '../ExtensionHostActivationEvent/ExtensionHostActivationEvent.ts'
import * as ExtensionHostCommandType from '../ExtensionHostCommandType/ExtensionHostCommandType.ts'

export const executeReferenceProvider = async (editorId: number, offset: number): Promise<readonly any[]> => {
  const result = await ExecuteProvider.executeProvider({
    event: ExtensionHostActivationEvent.OnReferences,
    method: ExtensionHostCommandType.ReferenceExecuteReferenceProvider,
    params: [editorId, offset],
  })
  Assert.array(result)
  return result
}

export const executeReferenceProvider2 = async (uri: string, offset: number): Promise<readonly any[]> => {
  const result = await ExecuteProvider.executeProvider({
    event: ExtensionHostActivationEvent.OnReferences,
    method: ExtensionHostCommandType.ReferenceExecuteReferenceProvider2,
    params: [uri, offset],
  })
  Assert.array(result)
  return result
}

export const executeFileReferenceProvider = (id: number, languageId: string): Promise<readonly any[]> => {
  return ExecuteProvider.executeProvider({
    event: `onReferences:${languageId}`,
    method: ExtensionHostCommandType.ReferenceExecuteFileReferenceProvider,
    params: [id],
  })
}
