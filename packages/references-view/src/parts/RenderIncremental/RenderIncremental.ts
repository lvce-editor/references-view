import { diffTree } from '@lvce-editor/virtual-dom-worker'
import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import type { ViewletCommand } from '../ViewletCommand/ViewletCommand.ts'
import { renderItems } from '../RenderItems/RenderItems.ts'

export const renderIncremental = (oldState: ReferencesState, newState: ReferencesState): ViewletCommand => {
  const oldDom = renderItems(oldState, oldState)[2]
  const newDom = renderItems(newState, newState)[2]
  const patches = diffTree(oldDom, newDom)
  return ['Viewlet.setPatches', newState.id, patches]
}
