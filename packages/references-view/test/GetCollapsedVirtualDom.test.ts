import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplayReference } from '../src/parts/DisplayReference/DisplayReference.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetCollapsedVirtualDom from '../src/parts/GetCollapsedVirtualDom/GetCollapsedVirtualDom.ts'
import * as LocationType from '../src/parts/LocationType/LocationType.ts'

test('getCollapsedVirtualDom', () => {
  const location: DisplayReference = {
    depth: 0,
    endOffset: undefined,
    icon: 'file-icon.png',
    index: 0,
    lineText: '',
    name: 'example.ts',
    posInSet: 1,
    setSize: 1,
    startOffset: undefined,
    type: LocationType.Collapsed,
    uri: 'file:///example.ts',
  }

  const result = GetCollapsedVirtualDom.getCollapsedVirtualDom(location)

  expect(result).toEqual([
    {
      ariaExpanded: false,
      childCount: 1,
      className: ClassNames.TreeItem,
      'data-index': 0,
      id: 'Reference-0',
      role: 'treeitem',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'example.ts',
      type: VirtualDomElements.Text,
    },
  ])
})
