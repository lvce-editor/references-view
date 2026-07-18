import * as CommandMap from '../CommandMap/CommandMap.ts'
import { initializeEditorWorker } from '../InitializeEditorWorker/InitializeEditorWorker.ts'
import { initializeExtensionManagementWorker } from '../InitializeExtensionManagementWorker/InitializeExtensionManagementWorker.ts'
import { initializeRendererWorker } from '../InitializeRendererWorker/InitializeRendererWorker.ts'
import { registerCommands } from '../ReferencesStates/ReferencesStates.ts'

export const listen = async (): Promise<void> => {
  registerCommands(CommandMap.commandMap)
  await Promise.all([initializeRendererWorker(), initializeExtensionManagementWorker(), initializeEditorWorker()])
}
