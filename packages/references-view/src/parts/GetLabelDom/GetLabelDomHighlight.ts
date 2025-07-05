import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomHelpers from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getLabelDomHighlight = (lineText: string, startOffset: number, endOffset: number): readonly VirtualDomNode[] => {
  const before = lineText.slice(0, startOffset)
  const middle = lineText.slice(startOffset, endOffset)
  const end = lineText.slice(endOffset)
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Label,
      childCount: 3,
    },
    VirtualDomHelpers.text(before),
    {
      type: VirtualDomElements.Span,
      className: ClassNames.Highlight,
      childCount: 1,
    },
    VirtualDomHelpers.text(middle),
    VirtualDomHelpers.text(end),
  ]
}
