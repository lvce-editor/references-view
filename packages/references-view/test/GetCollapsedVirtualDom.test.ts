import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplayReference } from '../src/parts/DisplayReference/DisplayReference.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetCollapsedVirtualDom from '../src/parts/GetCollapsedVirtualDom/GetCollapsedVirtualDom.ts'
import * as LocationType from '../src/parts/LocationType/LocationType.ts'

test('getCollapsedVirtualDom', () => {
  const location: DisplayReference = {
    type: LocationType.Collapsed,
    index: 0,
    name: 'example.ts',
    depth: 0,
    posInSet: 1,
    setSize: 1,
    uri: 'file:///example.ts',
    lineText: '',
    icon: 'file-icon.png',
    startOffset: undefined,
    endOffset: undefined,
  }

  const result = GetCollapsedVirtualDom.getCollapsedVirtualDom(location)

  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.TreeItem,
      ariaExpanded: false,
      id: 'Reference-0',
      'data-index': 0,
      role: 'treeitem',
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'example.ts',
      childCount: 0,
    },
  ])
})