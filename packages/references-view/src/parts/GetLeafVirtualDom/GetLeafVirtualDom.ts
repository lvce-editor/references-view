import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplayReference } from '../DisplayReference/DisplayReference.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomHelpers from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getLeafVirtualDom = (location: DisplayReference): readonly VirtualDomNode[] => {
  const { lineText, index, startOffset, endOffset } = location
  const dom = []
  dom.push({
    type: VirtualDomElements.Div,
    className: ClassNames.TreeItem,
    id: `Reference-${index}`,
    childCount: 1,
    paddingLeft: '2rem',
  })
  if (startOffset === endOffset) {
    dom.push(
      {
        type: VirtualDomElements.Div,
        className: ClassNames.Label,
        childCount: 1,
      },
      VirtualDomHelpers.text(lineText || '(empty line)'),
    )
  } else {
    const before = lineText.slice(0, startOffset)
    const middle = lineText.slice(startOffset, endOffset)
    const end = lineText.slice(endOffset)
    dom.push(
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
    )
  }
  return dom
}