import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetLocationVirtualDom from '../src/parts/GetLocationVirtualDom/GetLocationVirtualDom.ts'
import * as LocationType from '../src/parts/LocationType/LocationType.ts'

test('getLocationVirtualDom with leaf type', () => {
  const location = {
    type: LocationType.Leaf,
    lineText: 'const test = "value"',
    index: 0,
    startOffset: 6,
    endOffset: 10,
    depth: 0,
    posInSet: 1,
    setSize: 1,
    uri: 'file:///test.ts',
    name: 'test.ts',
    icon: 'file-icon.png',
  }

  const result = GetLocationVirtualDom.getLocationVirtualDom(location)

  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.TreeItem,
    id: 'Reference-0',
    childCount: 1,
    paddingLeft: '2rem',
  })
})

test('getLocationVirtualDom with collapsed type', () => {
  const location = {
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

  const result = GetLocationVirtualDom.getLocationVirtualDom(location)

  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.TreeItem,
    ariaExpanded: false,
    id: 'Reference-0',
    childCount: 1,
  })
})

test('getLocationVirtualDom with expanded type', () => {
  const location = {
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

  const result = GetLocationVirtualDom.getLocationVirtualDom(location)

  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.TreeItem,
    ariaExpanded: true,
    id: 'Reference-0',
    childCount: 2,
    paddingLeft: '1rem',
  })
})

test('getLocationVirtualDom with unknown type', () => {
  const location = {
    type: 999,
    index: 0,
    name: 'unknown.ts',
    depth: 0,
    posInSet: 1,
    setSize: 1,
    uri: 'file:///unknown.ts',
    lineText: '',
    icon: 'file-icon.png',
    startOffset: undefined,
    endOffset: undefined,
  }

  const result = GetLocationVirtualDom.getLocationVirtualDom(location)

  expect(result).toEqual([])
})