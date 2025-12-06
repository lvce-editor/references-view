import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplayReference } from '../DisplayReference/DisplayReference.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetLabelDom from '../GetLabelDom/GetLabelDom.ts'

export const getLeafVirtualDom = (location: DisplayReference): readonly VirtualDomNode[] => {
  const { index } = location
  return [
    {
      childCount: 1,
      className: ClassNames.TreeItem,
      'data-index': index,
      id: `Reference-${index}`,
      paddingLeft: '2rem',
      role: 'treeitem',
      type: VirtualDomElements.Div,
    },
    ...GetLabelDom.getLabelDom(location),
  ]
}
