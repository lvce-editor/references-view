import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplayReference } from '../DisplayReference/DisplayReference.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomHelpers from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getCollapsedVirtualDom = (location: DisplayReference): readonly VirtualDomNode[] => {
  const { index, name } = location
  return [
    {
      ariaExpanded: false,
      childCount: 1,
      className: ClassNames.TreeItem,
      'data-index': index,
      id: `Reference-${index}`,
      role: 'treeitem',
      type: VirtualDomElements.Div,
    },
    VirtualDomHelpers.text(name),
  ]
}
