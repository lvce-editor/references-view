import { expect, test } from '@jest/globals'
import * as ActionType from '../src/parts/ActionType/ActionType.ts'
import * as Icon from '../src/parts/Icon/Icon.ts'
import * as LocationStrings from '../src/parts/LocationStrings/LocationsStrings.ts'
import * as RenderActions from '../src/parts/RenderActions/RenderActions.ts'

test('renderActions returns correct action buttons', () => {
  const actions = RenderActions.renderActions()

  expect(actions).toHaveLength(3)

  expect(actions[0]).toEqual({
    type: ActionType.Button,
    id: LocationStrings.refresh(),
    icon: Icon.Refresh,
    command: 'References.refresh',
  })

  expect(actions[1]).toEqual({
    type: ActionType.Button,
    id: LocationStrings.clear(),
    icon: Icon.ClearAll,
    command: 'References.clear',
  })

  expect(actions[2]).toEqual({
    type: ActionType.Button,
    id: LocationStrings.collapseAll(),
    icon: Icon.CollapseAll,
    command: 'References.collapseAll',
  })
})
