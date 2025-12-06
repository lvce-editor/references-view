import { KeyCode } from '@lvce-editor/virtual-dom-worker'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const getKeyBindings = (): readonly any[] => {
  return [
    {
      command: 'References.focusNext',
      key: KeyCode.DownArrow,
      when: WhenExpression.FocusLocationList,
    },
    {
      command: 'References.focusPrevious',
      key: KeyCode.UpArrow,
      when: WhenExpression.FocusLocationList,
    },
    {
      command: 'References.focusFirst',
      key: KeyCode.Home,
      when: WhenExpression.FocusLocationList,
    },
    {
      command: 'References.focusLast',
      key: KeyCode.End,
      when: WhenExpression.FocusLocationList,
    },
    {
      command: 'References.selectCurrent',
      key: KeyCode.Enter,
      when: WhenExpression.FocusLocationList,
    },
  ]
}
