import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { ViewletCommand } from '@lvce-editor/constants'
import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import type { IViewletCommand } from '../ViewletCommand/ViewletCommand.ts'
import * as GetLocationsVirtualDom from '../GetLocationsVirtualDom/GetLocationsVirtualDom.ts'

export const renderItems = (oldState: ReferencesState, newState: ReferencesState): IViewletCommand => {
  const { id, initial } = newState
  if (initial) {
    return [ViewletCommand.SetDom2, id, []]
  }
  const dom: readonly VirtualDomNode[] = GetLocationsVirtualDom.getLocationsVirtualDom(newState.displayReferences, newState.message)
  return [ViewletCommand.SetDom2, id, dom]
}
