import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomHelpers from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const labelNode: VirtualDomNode = {
  childCount: 3,
  className: ClassNames.Label,
  type: VirtualDomElements.Div,
}

const highlightNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.Highlight,
  type: VirtualDomElements.Span,
}

export const getLabelDomHighlight = (lineText: string, startOffset: number, endOffset: number): readonly VirtualDomNode[] => {
  const before = lineText.slice(0, startOffset)
  const middle = lineText.slice(startOffset, endOffset)
  const end = lineText.slice(endOffset)
  return [labelNode, VirtualDomHelpers.text(before), highlightNode, VirtualDomHelpers.text(middle), VirtualDomHelpers.text(end)]
}
