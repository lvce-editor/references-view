import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplayReference } from '../DisplayReference/DisplayReference.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomHelpers from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getExpandedVirtualDom = (location: DisplayReference): readonly VirtualDomNode[] => {
  const { icon, index, name } = location
  return [
    {
      ariaExpanded: true,
      childCount: 2,
      className: ClassNames.TreeItem,
      'data-index': index,
      id: `Reference-${index}`,
      paddingLeft: '1rem',
      role: 'treeitem',
      type: VirtualDomElements.Div,
    },
    {
      className: ClassNames.FileIcon,
      src: icon,
      type: VirtualDomElements.Img,
    },
    VirtualDomHelpers.text(name),
  ]
}
