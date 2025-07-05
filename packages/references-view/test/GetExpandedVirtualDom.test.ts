import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplayReference } from '../src/parts/DisplayReference/DisplayReference.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetExpandedVirtualDom from '../src/parts/GetExpandedVirtualDom/GetExpandedVirtualDom.ts'
import * as LocationType from '../src/parts/LocationType/LocationType.ts'

test('getExpandedVirtualDom', () => {
  const location: DisplayReference = {
    type: LocationType.Expanded,
    index: 0,
    name: 'example.ts',
    icon: 'file-icon.png',
    depth: 0,
    posInSet: 1,
    setSize: 1,
    uri: 'file:///example.ts',
    lineText: '',
    startOffset: undefined,
    endOffset: undefined,
  }

  const result = GetExpandedVirtualDom.getExpandedVirtualDom(location)

  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.TreeItem,
      ariaExpanded: true,
      id: 'Reference-0',
      'data-index': 0,
      role: 'treeitem',
      childCount: 2,
      paddingLeft: '1rem',
    },
    {
      type: VirtualDomElements.Img,
      className: ClassNames.FileIcon,
      src: 'file-icon.png',
    },
    {
      type: VirtualDomElements.Text,
      text: 'example.ts',
      childCount: 0,
    },
  ])
})
