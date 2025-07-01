import * as ReferencesStates from '../ReferencesStates/ReferencesStates.ts'

export const dispose = async (uid: number): Promise<void> => {
  ReferencesStates.dispose(uid)
}
