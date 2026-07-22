import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomHelpers from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const labelNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.Label,
  type: VirtualDomElements.Div,
}

export const getLabelDomNoHighlight = (lineText: string | undefined): readonly VirtualDomNode[] => {
  return [labelNode, VirtualDomHelpers.text(lineText || '(empty line)')]
}
