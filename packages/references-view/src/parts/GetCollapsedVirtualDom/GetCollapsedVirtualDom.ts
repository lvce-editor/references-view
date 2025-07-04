import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplayReference } from '../DisplayReference/DisplayReference.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomHelpers from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getCollapsedVirtualDom = (location: DisplayReference): readonly VirtualDomNode[] => {
  const { index, name } = location
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.TreeItem,
      ariaExpanded: false,
      id: `Reference-${index}`,
      'data-index': index,
      role: 'treeitem',
      childCount: 1,
    },
    VirtualDomHelpers.text(name),
  ]
}