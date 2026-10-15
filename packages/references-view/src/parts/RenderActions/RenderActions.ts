import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ActionType from '../ActionType/ActionType.ts'
import { getActionButtonVirtualDom } from '../GetActionButtonVirtualDom/GetActionButtonVirtualDom.ts'
import * as Icon from '../Icon/Icon.ts'
import * as ViewletReferencesStrings from '../LocationStrings/LocationsStrings.ts'
import * as ReferencesStates from '../ReferencesStates/ReferencesStates.ts'

const getActionButtons = (editorFound: boolean): readonly any[] => {
  return [
    {
      command: 'refresh',
      disabled: !editorFound,
      icon: Icon.Refresh,
      id: ViewletReferencesStrings.refresh(),
      type: ActionType.Button,
    },
    {
      command: 'clear',
      disabled: !editorFound,
      icon: Icon.ClearAll,
      id: ViewletReferencesStrings.clear(),
      type: ActionType.Button,
    },
    {
      command: 'collapseAll',
      disabled: !editorFound,
      icon: Icon.CollapseAll,
      id: ViewletReferencesStrings.collapseAll(),
      type: ActionType.Button,
    },
  ]
}

export const renderActions = (uid: number): readonly any[] => {
  const { newState } = ReferencesStates.get(uid)
  const buttons = getActionButtons(newState.editorFound)

  return [
    {
      childCount: buttons.length,
      className: 'Actions',
      type: VirtualDomElements.Div,
    },
    ...buttons.flatMap(getActionButtonVirtualDom),
  ]
}
