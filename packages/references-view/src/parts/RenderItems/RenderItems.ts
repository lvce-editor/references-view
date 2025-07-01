import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import type { ViewletCommand } from '../ViewletCommand/ViewletCommand.ts'

export const renderItems = (oldState: ReferencesState, newState: ReferencesState): ViewletCommand => {
  const dom: readonly VirtualDomNode[] = []
  return ['Viewlet.setDom2', newState.id, dom]
}
