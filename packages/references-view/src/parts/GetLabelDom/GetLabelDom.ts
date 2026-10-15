import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { DisplayReference } from '../DisplayReference/DisplayReference.ts'
import { getLabelDomHighlight } from './GetLabelDomHighlight.ts'
import { getLabelDomNoHighlight } from './GetLabelDomNoHighlight.ts'

export const getLabelDom = (location: DisplayReference): readonly VirtualDomNode[] => {
  const { endOffset, index, lineText, startOffset } = location
  if (startOffset === endOffset) {
    return getLabelDomNoHighlight(lineText, index)
  }
  return getLabelDomHighlight(lineText, startOffset ?? 0, endOffset ?? 0, index)
}
