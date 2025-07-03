import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { DisplayReference } from '../DisplayReference/DisplayReference.ts'
import { getLabelDomHighlight } from './GetLabelDomHighlight.js'
import { getLabelDomNoHighlight } from './GetLabelDomNoHighlight.js'

export const getLabelDom = (location: DisplayReference): readonly VirtualDomNode[] => {
  const { lineText, startOffset, endOffset } = location
  if (startOffset === endOffset) {
    return getLabelDomNoHighlight(lineText)
  }
  return getLabelDomHighlight(lineText, startOffset ?? 0, endOffset ?? 0)
}