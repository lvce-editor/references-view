import { KeyCode } from '@lvce-editor/virtual-dom-worker'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const getKeyBindings = (): readonly any[] => {
  return [
    {
      key: KeyCode.DownArrow,
      command: 'References.focusNext',
      when: WhenExpression.FocusLocationList,
    },
    {
      key: KeyCode.UpArrow,
      command: 'References.focusPrevious',
      when: WhenExpression.FocusLocationList,
    },
    {
      key: KeyCode.Home,
      command: 'References.focusFirst',
      when: WhenExpression.FocusLocationList,
    },
    {
      key: KeyCode.End,
      command: 'References.focusLast',
      when: WhenExpression.FocusLocationList,
    },
    {
      key: KeyCode.Enter,
      command: 'References.selectCurrent',
      when: WhenExpression.FocusLocationList,
    },
  ]
}
