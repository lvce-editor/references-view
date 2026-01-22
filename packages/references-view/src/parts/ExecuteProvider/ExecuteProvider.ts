import * as ExtensionHost from '../ExtensionHost/ExtensionHost.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const executeProvider = async ({
  assetDir,
  event,
  method,
  params,
  platform,
}: {
  event: string
  method: string
  params: readonly any[]
  platform: number
  assetDir: string
}): Promise<any> => {
  await RendererWorker.activateByEvent(event, assetDir, platform)
  // @ts-ignore
  const result = await ExtensionHost.invoke(method, ...params)
  return result
}
