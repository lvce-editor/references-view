import * as RunAndDebugStates from '../ReferencesStates/ReferencesStates.ts'

export const dispose = async (uid: number): Promise<void> => {
  RunAndDebugStates.dispose(uid)
}
