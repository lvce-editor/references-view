import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomHelpers from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const getLabelNode = (index: number): VirtualDomNode => ({
  childCount: 1,
  className: ClassNames.Label,
  'data-index': index,
  type: VirtualDomElements.Div,
})

export const getLabelDomNoHighlight = (lineText: string | undefined, index: number): readonly VirtualDomNode[] => {
  return [getLabelNode(index), VirtualDomHelpers.text(lineText || '(empty line)')]
}
