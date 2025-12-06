import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplayReference } from '../src/parts/DisplayReference/DisplayReference.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetExpandedVirtualDom from '../src/parts/GetExpandedVirtualDom/GetExpandedVirtualDom.ts'
import * as LocationType from '../src/parts/LocationType/LocationType.ts'

test('getExpandedVirtualDom', () => {
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
    type: LocationType.Expanded,
    uri: 'file:///example.ts',
  }

  const result = GetExpandedVirtualDom.getExpandedVirtualDom(location)

  expect(result).toEqual([
    {
      ariaExpanded: true,
      childCount: 2,
      className: ClassNames.TreeItem,
      'data-index': 0,
      id: 'Reference-0',
      paddingLeft: '1rem',
      role: 'treeitem',
      type: VirtualDomElements.Div,
    },
    {
      className: ClassNames.FileIcon,
      src: 'file-icon.png',
      type: VirtualDomElements.Img,
    },
    {
      childCount: 0,
      text: 'example.ts',
      type: VirtualDomElements.Text,
    },
  ])
})
