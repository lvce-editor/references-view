import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplayReference } from '../src/parts/DisplayReference/DisplayReference.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetLeafVirtualDom from '../src/parts/GetLeafVirtualDom/GetLeafVirtualDom.ts'
import * as LocationType from '../src/parts/LocationType/LocationType.ts'

test('getLeafVirtualDom with highlighted text', () => {
  const location: DisplayReference = {
    depth: 0,
    endOffset: 13,
    icon: 'file-icon.png',
    index: 0,
    lineText: 'const example = "test"',
    name: 'test.ts',
    posInSet: 1,
    setSize: 1,
    startOffset: 6,
    type: LocationType.Leaf,
    uri: 'file:///test.ts',
  }

  const result = GetLeafVirtualDom.getLeafVirtualDom(location)

  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.TreeItem,
    'data-index': 0,
    id: 'Reference-0',
    paddingLeft: '2rem',
    role: 'treeitem',
    type: VirtualDomElements.Div,
  })

  expect(result[1]).toEqual({
    childCount: 3,
    className: ClassNames.Label,
    type: VirtualDomElements.Div,
  })

  expect(result[2]).toEqual({
    childCount: 0,
    text: 'const ',
    type: VirtualDomElements.Text,
  })

  expect(result[3]).toEqual({
    childCount: 1,
    className: ClassNames.Highlight,
    type: VirtualDomElements.Span,
  })

  expect(result[4]).toEqual({
    childCount: 0,
    text: 'example',
    type: VirtualDomElements.Text,
  })

  expect(result[5]).toEqual({
    childCount: 0,
    text: ' = "test"',
    type: VirtualDomElements.Text,
  })
})

test('getLeafVirtualDom with empty line', () => {
  const location: DisplayReference = {
    depth: 0,
    endOffset: 0,
    icon: 'file-icon.png',
    index: 1,
    lineText: '',
    name: 'test.ts',
    posInSet: 1,
    setSize: 1,
    startOffset: 0,
    type: LocationType.Leaf,
    uri: 'file:///test.ts',
  }

  const result = GetLeafVirtualDom.getLeafVirtualDom(location)

  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.TreeItem,
    'data-index': 1,
    id: 'Reference-1',
    paddingLeft: '2rem',
    role: 'treeitem',
    type: VirtualDomElements.Div,
  })

  expect(result[1]).toEqual({
    childCount: 1,
    className: ClassNames.Label,
    type: VirtualDomElements.Div,
  })

  expect(result[2]).toEqual({
    childCount: 0,
    text: '(empty line)',
    type: VirtualDomElements.Text,
  })
})

test('getLeafVirtualDom with null lineText', () => {
  const location: DisplayReference = {
    depth: 0,
    endOffset: 0,
    icon: 'file-icon.png',
    index: 2,
    lineText: null as any,
    name: 'test.ts',
    posInSet: 1,
    setSize: 1,
    startOffset: 0,
    type: LocationType.Leaf,
    uri: 'file:///test.ts',
  }

  const result = GetLeafVirtualDom.getLeafVirtualDom(location)

  expect(result[2]).toEqual({
    childCount: 0,
    text: '(empty line)',
    type: VirtualDomElements.Text,
  })
})
