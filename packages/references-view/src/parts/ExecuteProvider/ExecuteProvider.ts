import * as ExtensionHost from '../ExtensionHost/ExtensionHost.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const executeProvider = async ({ event, method, params }: { event: string; method: string; params: readonly any[] }): Promise<any> => {
  await RendererWorker.activateByEvent(event)
  // @ts-ignore
  const result = await ExtensionHost.invoke(method, ...params)
  return result
}
