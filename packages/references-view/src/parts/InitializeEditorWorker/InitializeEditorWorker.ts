import { createEditorWorkerRpc } from '../CreateEditorWorkerRpc/CreateEditorWorkerRpc.ts'
import * as EditorWorker from '../EditorWorker/EditorWorker.ts'

export const initializeEditorWorker = async (): Promise<void> => {
  try {
    const rpc = await createEditorWorkerRpc()
    EditorWorker.set(rpc)
  } catch {
    // ignore
  }
}
