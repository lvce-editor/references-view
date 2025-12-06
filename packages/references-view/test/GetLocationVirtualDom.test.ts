import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplayReference } from '../src/parts/DisplayReference/DisplayReference.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetLocationVirtualDom from '../src/parts/GetLocationVirtualDom/GetLocationVirtualDom.ts'
import * as LocationType from '../src/parts/LocationType/LocationType.ts'

test('getLocationVirtualDom with leaf type', () => {
  const location: DisplayReference = {
    depth: 0,
    endOffset: 10,
    icon: 'file-icon.png',
    index: 0,
    lineText: 'const test = "value"',
    name: 'test.ts',
    posInSet: 1,
    setSize: 1,
    startOffset: 6,
    type: LocationType.Leaf,
    uri: 'file:///test.ts',
  }

  const result = GetLocationVirtualDom.getLocationVirtualDom(location)

  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.TreeItem,
    'data-index': 0,
    id: 'Reference-0',
    paddingLeft: '2rem',
    role: 'treeitem',
    type: VirtualDomElements.Div,
  })
})

test('getLocationVirtualDom with collapsed type', () => {
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

  const result = GetLocationVirtualDom.getLocationVirtualDom(location)

  expect(result[0]).toEqual({
    ariaExpanded: false,
    childCount: 1,
    className: ClassNames.TreeItem,
    'data-index': 0,
    id: 'Reference-0',
    role: 'treeitem',
    type: VirtualDomElements.Div,
  })
})

test('getLocationVirtualDom with expanded type', () => {
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

  const result = GetLocationVirtualDom.getLocationVirtualDom(location)

  expect(result[0]).toEqual({
    ariaExpanded: true,
    childCount: 2,
    className: ClassNames.TreeItem,
    'data-index': 0,
    id: 'Reference-0',
    paddingLeft: '1rem',
    role: 'treeitem',
    type: VirtualDomElements.Div,
  })
})

test('getLocationVirtualDom with unknown type', () => {
  const location: DisplayReference = {
    depth: 0,
    endOffset: undefined,
    icon: 'file-icon.png',
    index: 0,
    lineText: '',
    name: 'unknown.ts',
    posInSet: 1,
    setSize: 1,
    startOffset: undefined,
    type: 999,
    uri: 'file:///unknown.ts',
  }

  const result = GetLocationVirtualDom.getLocationVirtualDom(location)

  expect(result).toEqual([])
})
