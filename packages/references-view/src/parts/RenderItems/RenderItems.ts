import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import type { ViewletCommand } from '../ViewletCommand/ViewletCommand.ts'
import * as GetLocationsVirtualDom from '../GetLocationsVirtualDom/GetLocationsVirtualDom.ts'

export const renderItems = (oldState: ReferencesState, newState: ReferencesState): ViewletCommand => {
  const dom: readonly VirtualDomNode[] = GetLocationsVirtualDom.getLocationsVirtualDom(newState.displayReferences, newState.message)
  return ['Viewlet.setDom2', newState.id, dom]
}
