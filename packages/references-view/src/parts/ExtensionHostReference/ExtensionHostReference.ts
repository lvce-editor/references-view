import * as Assert from '../Assert/Assert.ts'
import { executeProvider } from '../ExecuteProvider/ExecuteProvider.ts'
import * as ExtensionHostActivationEvent from '../ExtensionHostActivationEvent/ExtensionHostActivationEvent.ts'
import * as ExtensionHostCommandType from '../ExtensionHostCommandType/ExtensionHostCommandType.ts'

export const executeReferenceProvider = async (editor: any, offset: number): Promise<readonly any[]> => {
  const result = await executeProvider({
    event: ExtensionHostActivationEvent.OnReferences,
    method: ExtensionHostCommandType.ReferenceExecuteReferenceProvider,
    params: [editor.id, offset],
  })
  Assert.array(result)
  return result
}

export const executeFileReferenceProvider = (id: number, languageId: string): Promise<readonly any[]> => {
  return executeProvider({
    event: `onReferences:${languageId}`,
    method: ExtensionHostCommandType.ReferenceExecuteFileReferenceProvider,
    params: [id],
  })
}
