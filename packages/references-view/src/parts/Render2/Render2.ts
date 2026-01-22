import type { IViewletCommand } from '../ViewletCommand/ViewletCommand.ts'
import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as RunAndDebugStates from '../ReferencesStates/ReferencesStates.ts'

export const render2 = (uid: number, diffResult: readonly number[]): readonly IViewletCommand[] => {
  const { newState, oldState } = RunAndDebugStates.get(uid)
  RunAndDebugStates.set(uid, newState, newState)
  const commands = ApplyRender.applyRender(oldState, newState, diffResult)
  return commands
}
