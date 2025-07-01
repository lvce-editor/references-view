import * as Diff from '../Diff/Diff.ts'
import * as RunAndDebugStates from '../ReferencesStates/ReferencesStates.ts'

export const diff2 = (uid: number): readonly number[] => {
  const { oldState, newState } = RunAndDebugStates.get(uid)

  const diffResult = Diff.diff(oldState, newState)
  return diffResult
}
