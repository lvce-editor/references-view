import * as ExtensionManagementWorker from '../ExtensionManagementWorker/ExtensionManagementWorker.ts'

interface LanguageProviderResult {
  readonly found: boolean
  readonly result?: unknown
}

export const executeProvider = async ({
  assetDir,
  event,
  method,
  params,
  platform,
  textDocument,
}: {
  event: string
  method: string
  params: readonly any[]
  platform: number
  assetDir: string
  textDocument: {
    readonly languageId: string
    readonly uri: string
  }
}): Promise<any> => {
  const activationResult = (await ExtensionManagementWorker.invoke('Extensions.activateByEvent', event, assetDir, platform)) as {
    readonly error?: Error
  }
  if (activationResult.error) {
    throw activationResult.error
  }
  const providerResult = (await ExtensionManagementWorker.invoke(
    'Extensions.executeLanguageProvider',
    'reference',
    method,
    textDocument,
    ...params,
  )) as LanguageProviderResult
  return providerResult.found ? providerResult.result : []
}
