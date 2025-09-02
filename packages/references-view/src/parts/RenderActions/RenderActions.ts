import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ActionType from '../ActionType/ActionType.ts'
import { getActionButtonVirtualDom } from '../GetActionButtonVirtualDom/GetActionButtonVirtualDom.ts'
import * as Icon from '../Icon/Icon.ts'
import * as ViewletReferencesStrings from '../LocationStrings/LocationsStrings.ts'

const getActionButtons = (): readonly any[] => {
  return [
    {
      type: ActionType.Button,
      id: ViewletReferencesStrings.refresh(),
      icon: Icon.Refresh,
      command: 'References.refresh',
    },
    {
      type: ActionType.Button,
      id: ViewletReferencesStrings.clear(),
      icon: Icon.ClearAll,
      command: 'References.clear',
    },
    {
      type: ActionType.Button,
      id: ViewletReferencesStrings.collapseAll(),
      icon: Icon.CollapseAll,
      command: 'References.collapseAll',
    },
  ]
}

export const renderActions = (): readonly any[] => {
  const buttons = getActionButtons()

  return [
    {
      type: VirtualDomElements.Div,
      className: 'Actions',
      childCount: buttons.length,
    },
    ...buttons.flatMap(getActionButtonVirtualDom),
  ]
}
