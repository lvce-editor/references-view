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
      childCount: 3,
      className: ClassNames.Label,
      type: VirtualDomElements.Div,
    },
    VirtualDomHelpers.text(before),
    {
      childCount: 1,
      className: ClassNames.Highlight,
      type: VirtualDomElements.Span,
    },
    VirtualDomHelpers.text(middle),
    VirtualDomHelpers.text(end),
  ]
}
