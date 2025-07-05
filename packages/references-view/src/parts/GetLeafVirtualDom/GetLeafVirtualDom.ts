import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplayReference } from '../DisplayReference/DisplayReference.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetLabelDom from '../GetLabelDom/GetLabelDom.ts'

export const getLeafVirtualDom = (location: DisplayReference): readonly VirtualDomNode[] => {
  const { index } = location
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.TreeItem,
      id: `Reference-${index}`,
      'data-index': index,
      role: 'treeitem',
      childCount: 1,
      paddingLeft: '2rem',
    },
    ...GetLabelDom.getLabelDom(location),
  ]
}
