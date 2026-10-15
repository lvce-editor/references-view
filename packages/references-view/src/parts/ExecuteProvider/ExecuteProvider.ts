import * as ExtensionManagementWorker from '../ExtensionManagementWorker/ExtensionManagementWorker.ts'

export interface LanguageProviderResult {
  readonly found: boolean
  readonly result?: unknown
}

export const executeProvider = async ({
  applicationId,
  assetDir,
  event,
  kind = 'reference',
  method,
  params,
  platform,
  textDocument,
}: {
  applicationId?: string
  event: string
  kind?: string
  method: string
  params: readonly any[]
  platform: number
  assetDir: string
  textDocument: {
    readonly languageId: string
    readonly text: string
    readonly uri: string
  }
}): Promise<LanguageProviderResult> => {
  const invoke = (method: string, ...args: readonly unknown[]): Promise<unknown> => {
    return applicationId
      ? ExtensionManagementWorker.invoke('Extensions.invokeForApplication', applicationId, method, ...args)
      : ExtensionManagementWorker.invoke(method, ...args)
  }
  const activationResult = (await invoke('Extensions.activateByEvent', event, assetDir, platform)) as {
    readonly error?: Error
  }
  if (activationResult.error) {
    throw activationResult.error
  }
  const providerResult = (await invoke('Extensions.executeLanguageProvider', kind, method, textDocument, ...params)) as LanguageProviderResult
  return providerResult
}
