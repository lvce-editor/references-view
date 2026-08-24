import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplayReference } from '../DisplayReference/DisplayReference.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomHelpers from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getExpandedVirtualDom = (location: DisplayReference): readonly VirtualDomNode[] => {
  const { icon, index, name } = location
  const fileIconDom: readonly VirtualDomNode[] = icon
    ? [
        {
          className: ClassNames.FileIcon,
          src: icon,
          type: VirtualDomElements.Img,
        },
      ]
    : []
  return [
    {
      ariaExpanded: true,
      childCount: 1 + fileIconDom.length,
      className: ClassNames.TreeItem,
      'data-index': index,
      id: `Reference-${index}`,
      paddingLeft: '1rem',
      role: AriaRoles.TreeItem,
      type: VirtualDomElements.Div,
    },
    ...fileIconDom,
    VirtualDomHelpers.text(name),
  ]
}
