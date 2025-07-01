import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const activateByEvent = (event: string): Promise<void> => {
  return RendererWorker.invoke('ExtensionHostManagement.activateByEvent', event)
}
