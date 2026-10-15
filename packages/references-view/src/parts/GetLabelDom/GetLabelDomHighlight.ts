import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomHelpers from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const getLabelNode = (index: number): VirtualDomNode => ({
  childCount: 3,
  className: ClassNames.Label,
  'data-index': index,
  type: VirtualDomElements.Div,
})

const getHighlightNode = (index: number): VirtualDomNode => ({
  childCount: 1,
  className: ClassNames.Highlight,
  'data-index': index,
  type: VirtualDomElements.Span,
})

export const getLabelDomHighlight = (lineText: string, startOffset: number, endOffset: number, index: number): readonly VirtualDomNode[] => {
  const before = lineText.slice(0, startOffset)
  const middle = lineText.slice(startOffset, endOffset)
  const end = lineText.slice(endOffset)
  return [getLabelNode(index), VirtualDomHelpers.text(before), getHighlightNode(index), VirtualDomHelpers.text(middle), VirtualDomHelpers.text(end)]
}
