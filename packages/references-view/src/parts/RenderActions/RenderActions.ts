import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ActionType from '../ActionType/ActionType.ts'
import { getActionButtonVirtualDom } from '../GetActionButtonVirtualDom/GetActionButtonVirtualDom.ts'
import * as Icon from '../Icon/Icon.ts'
import * as ViewletReferencesStrings from '../LocationStrings/LocationsStrings.ts'

const getActionButtons = (): readonly any[] => {
  return [
    {
      command: 'refresh',
      icon: Icon.Refresh,
      id: ViewletReferencesStrings.refresh(),
      type: ActionType.Button,
    },
    {
      command: 'clear',
      icon: Icon.ClearAll,
      id: ViewletReferencesStrings.clear(),
      type: ActionType.Button,
    },
    {
      command: 'collapseAll',
      icon: Icon.CollapseAll,
      id: ViewletReferencesStrings.collapseAll(),
      type: ActionType.Button,
    },
  ]
}

export const renderActions = (): readonly any[] => {
  const buttons = getActionButtons()

  return [
    {
      childCount: buttons.length,
      className: 'Actions',
      type: VirtualDomElements.Div,
    },
    ...buttons.flatMap(getActionButtonVirtualDom),
  ]
}
