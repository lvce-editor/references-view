import * as InitializeEditorWorker from '../InitializeEditorWorker/InitializeEditorWorker.ts'
import * as InitializeExtensionHost from '../InitializeExtensionHost/InitializeExtensionHost.ts'

export const initialize = async (): Promise<void> => {
  await Promise.all([InitializeExtensionHost.initializeExtensionHost(), InitializeEditorWorker.initializeEditorWorker()])
}
