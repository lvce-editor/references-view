import * as ExtensionManagementWorker from '../ExtensionManagementWorker/ExtensionManagementWorker.ts'

export interface LanguageProviderResult {
  readonly found: boolean
  readonly result?: unknown
}

export const executeProvider = async ({
  assetDir,
  event,
  kind = 'reference',
  method,
  params,
  platform,
  textDocument,
}: {
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
  const activationResult = (await ExtensionManagementWorker.invoke('Extensions.activateByEvent', event, assetDir, platform)) as {
    readonly error?: Error
  }
  if (activationResult.error) {
    throw activationResult.error
  }
  const providerResult = (await ExtensionManagementWorker.invoke('Extensions.executeLanguageProvider', kind, method, textDocument, ...params)) as LanguageProviderResult
  return providerResult
}
