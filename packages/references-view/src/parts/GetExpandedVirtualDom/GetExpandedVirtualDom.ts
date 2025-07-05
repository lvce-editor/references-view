import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplayReference } from '../DisplayReference/DisplayReference.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomHelpers from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getExpandedVirtualDom = (location: DisplayReference): readonly VirtualDomNode[] => {
  const { index, name, icon } = location
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.TreeItem,
      ariaExpanded: true,
      id: `Reference-${index}`,
      'data-index': index,
      role: 'treeitem',
      childCount: 2,
      paddingLeft: '1rem',
    },
    {
      type: VirtualDomElements.Img,
      className: ClassNames.FileIcon,
      src: icon,
    },
    VirtualDomHelpers.text(name),
  ]
}
