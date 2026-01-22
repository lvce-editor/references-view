import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import type { IViewletCommand } from '../ViewletCommand/ViewletCommand.ts'
import * as GetRenderer from '../GetRenderer/GetRenderer.ts'

export const applyRender = (oldState: ReferencesState, newState: ReferencesState, diffResult: readonly number[]): readonly IViewletCommand[] => {
  const commands: IViewletCommand[] = []
  for (const item of diffResult) {
    const fn = GetRenderer.getRenderer(item)
    commands.push(fn(oldState, newState))
  }
  return commands
}
