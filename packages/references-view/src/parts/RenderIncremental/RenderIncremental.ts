import { diffTree } from '@lvce-editor/virtual-dom-worker'
import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import type { IViewletCommand } from '../ViewletCommand/ViewletCommand.ts'
import { renderItems } from '../RenderItems/RenderItems.ts'

export const renderIncremental = (oldState: ReferencesState, newState: ReferencesState): IViewletCommand => {
  const oldDom = renderItems(oldState, oldState)[2]
  const newDom = renderItems(newState, newState)[2]
  const patches = diffTree(oldDom, newDom)
  return ['Viewlet.setPatches', newState.id, patches]
}
