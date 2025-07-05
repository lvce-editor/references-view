import * as ActionType from '../ActionType/ActionType.ts'
import * as Icon from '../Icon/Icon.ts'
import * as ViewletReferencesStrings from '../LocationStrings/LocationsStrings.ts'

export const renderActions = (): readonly any[] => {
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
