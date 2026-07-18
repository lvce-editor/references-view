import { expect, test } from '@jest/globals'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getActionButtonVirtualDom } from '../src/parts/GetActionButtonVirtualDom/GetActionButtonVirtualDom.ts'

test('getActionButtonVirtualDom uses an empty icon when the action has no icon', () => {
  const result = getActionButtonVirtualDom({
    command: 'References.refresh',
    id: 'Refresh',
    type: 0,
  })

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.IconButton,
      'data-command': 'References.refresh',
      title: 'Refresh',
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIcon',
      role: AriaRoles.None,
      type: VirtualDomElements.Div,
    },
  ])
})
