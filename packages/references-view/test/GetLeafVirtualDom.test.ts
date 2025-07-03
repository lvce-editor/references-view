import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetLeafVirtualDom from '../src/parts/GetLeafVirtualDom/GetLeafVirtualDom.ts'
import * as LocationType from '../src/parts/LocationType/LocationType.ts'

test('getLeafVirtualDom with highlighted text', () => {
  const location = {
    type: LocationType.Leaf,
    lineText: 'const example = "test"',
    index: 0,
    startOffset: 6,
    endOffset: 13,
    depth: 0,
    posInSet: 1,
    setSize: 1,
    uri: 'file:///test.ts',
    name: 'test.ts',
    icon: 'file-icon.png',
  }

  const result = GetLeafVirtualDom.getLeafVirtualDom(location)

  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.TreeItem,
    id: 'Reference-0',
    childCount: 1,
    paddingLeft: '2rem',
  })

  expect(result[1]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.Label,
    childCount: 3,
  })

  expect(result[2]).toEqual({
    type: VirtualDomElements.Text,
    text: 'const ',
    childCount: 0,
  })

  expect(result[3]).toEqual({
    type: VirtualDomElements.Span,
    className: ClassNames.Highlight,
    childCount: 1,
  })

  expect(result[4]).toEqual({
    type: VirtualDomElements.Text,
    text: 'example',
    childCount: 0,
  })

  expect(result[5]).toEqual({
    type: VirtualDomElements.Text,
    text: ' = "test"',
    childCount: 0,
  })
})

test('getLeafVirtualDom with empty line', () => {
  const location = {
    type: LocationType.Leaf,
    lineText: '',
    index: 1,
    startOffset: 0,
    endOffset: 0,
    depth: 0,
    posInSet: 1,
    setSize: 1,
    uri: 'file:///test.ts',
    name: 'test.ts',
    icon: 'file-icon.png',
  }

  const result = GetLeafVirtualDom.getLeafVirtualDom(location)

  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.TreeItem,
    id: 'Reference-1',
    childCount: 1,
    paddingLeft: '2rem',
  })

  expect(result[1]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.Label,
    childCount: 1,
  })

  expect(result[2]).toEqual({
    type: VirtualDomElements.Text,
    text: '(empty line)',
    childCount: 0,
  })
})

test('getLeafVirtualDom with null lineText', () => {
  const location = {
    type: LocationType.Leaf,
    lineText: null as any,
    index: 2,
    startOffset: 0,
    endOffset: 0,
    depth: 0,
    posInSet: 1,
    setSize: 1,
    uri: 'file:///test.ts',
    name: 'test.ts',
    icon: 'file-icon.png',
  }

  const result = GetLeafVirtualDom.getLeafVirtualDom(location)

  expect(result[2]).toEqual({
    type: VirtualDomElements.Text,
    text: '(empty line)',
    childCount: 0,
  })
})