import { test, expect } from '@jest/globals'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplayReference } from '../src/parts/DisplayReference/DisplayReference.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetLocationsVirtualDom from '../src/parts/GetLocationsVirtualDom/GetLocationsVirtualDom.ts'
import * as LocationStrings from '../src/parts/LocationStrings/LocationsStrings.ts'
import * as LocationType from '../src/parts/LocationType/LocationType.ts'

test('getLocationsVirtualDom with empty locations', () => {
  const locations: readonly DisplayReference[] = []
  const message = 'No results found'

  const result = GetLocationsVirtualDom.getLocationsVirtualDom(locations, message)

  expect(result).toEqual([
    {
      childCount: 2,
      className: 'Viewlet Locations',
      onMouseDown: 'handleClickReference',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.LocationsMessage,
      id: 'LocationsMessage',
      role: AriaRoles.Status,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: message,
      type: VirtualDomElements.Text,
    },
    {
      ariaDescribedBy: 'LocationsMessage',
      ariaLabel: LocationStrings.locations(),
      childCount: 0,
      className: ClassNames.LocationList,
      role: AriaRoles.Tree,
      tabIndex: 0,
      type: VirtualDomElements.Div,
    },
  ])
})

test('getLocationsVirtualDom with leaf location', () => {
  const locations: readonly DisplayReference[] = [
    {
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
    },
  ]
  const message = '1 result found'

  const result = GetLocationsVirtualDom.getLocationsVirtualDom(locations, message)

  expect(result[0]).toEqual({
    childCount: 2,
    className: 'Viewlet Locations',
    onMouseDown: 'handleClickReference',
    type: VirtualDomElements.Div,
  })

  expect(result[1]).toEqual({
    childCount: 1,
    className: ClassNames.LocationsMessage,
    id: 'LocationsMessage',
    role: AriaRoles.Status,
    type: VirtualDomElements.Div,
  })

  expect(result[2]).toEqual({
    childCount: 0,
    text: message,
    type: VirtualDomElements.Text,
  })

  expect(result[3]).toEqual({
    ariaDescribedBy: 'LocationsMessage',
    ariaLabel: LocationStrings.locations(),
    childCount: 1,
    className: ClassNames.LocationList,
    role: AriaRoles.Tree,
    tabIndex: 0,
    type: VirtualDomElements.Div,
  })

  // Check the leaf location structure
  expect(result[4]).toEqual({
    childCount: 1,
    className: ClassNames.TreeItem,
    'data-index': 0,
    id: 'Reference-0',
    paddingLeft: '2rem',
    role: 'treeitem',
    type: VirtualDomElements.Div,
  })

  expect(result[5]).toEqual({
    childCount: 3,
    className: ClassNames.Label,
    type: VirtualDomElements.Div,
  })

  expect(result[6]).toEqual({
    childCount: 0,
    text: 'const ',
    type: VirtualDomElements.Text,
  })

  expect(result[7]).toEqual({
    childCount: 1,
    className: ClassNames.Highlight,
    type: VirtualDomElements.Span,
  })

  expect(result[8]).toEqual({
    childCount: 0,
    text: 'example',
    type: VirtualDomElements.Text,
  })

  expect(result[9]).toEqual({
    childCount: 0,
    text: ' = "test"',
    type: VirtualDomElements.Text,
  })
})

test('getLocationsVirtualDom with leaf location empty line', () => {
  const locations: readonly DisplayReference[] = [
    {
      depth: 0,
      endOffset: 0,
      icon: 'file-icon.png',
      index: 0,
      lineText: '',
      name: 'test.ts',
      posInSet: 1,
      setSize: 1,
      startOffset: 0,
      type: LocationType.Leaf,
      uri: 'file:///test.ts',
    },
  ]
  const message = '1 result found'

  const result = GetLocationsVirtualDom.getLocationsVirtualDom(locations, message)

  // Check the leaf location structure for empty line
  expect(result[4]).toEqual({
    childCount: 1,
    className: ClassNames.TreeItem,
    'data-index': 0,
    id: 'Reference-0',
    paddingLeft: '2rem',
    role: 'treeitem',
    type: VirtualDomElements.Div,
  })

  expect(result[5]).toEqual({
    childCount: 1,
    className: ClassNames.Label,
    type: VirtualDomElements.Div,
  })

  expect(result[6]).toEqual({
    childCount: 0,
    text: '(empty line)',
    type: VirtualDomElements.Text,
  })
})

test('getLocationsVirtualDom with collapsed location', () => {
  const locations: readonly DisplayReference[] = [
    {
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
    },
  ]
  const message = '1 file found'

  const result = GetLocationsVirtualDom.getLocationsVirtualDom(locations, message)

  // Check the collapsed location structure
  expect(result[4]).toEqual({
    ariaExpanded: false,
    childCount: 1,
    className: ClassNames.TreeItem,
    'data-index': 0,
    id: 'Reference-0',
    role: 'treeitem',
    type: VirtualDomElements.Div,
  })

  expect(result[5]).toEqual({
    childCount: 0,
    text: 'example.ts',
    type: VirtualDomElements.Text,
  })
})

test('getLocationsVirtualDom with expanded location', () => {
  const locations: readonly DisplayReference[] = [
    {
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
    },
  ]
  const message = '1 file found'

  const result = GetLocationsVirtualDom.getLocationsVirtualDom(locations, message)

  // Check the expanded location structure
  expect(result[4]).toEqual({
    ariaExpanded: true,
    childCount: 2,
    className: ClassNames.TreeItem,
    'data-index': 0,
    id: 'Reference-0',
    paddingLeft: '1rem',
    role: 'treeitem',
    type: VirtualDomElements.Div,
  })

  expect(result[5]).toEqual({
    className: ClassNames.FileIcon,
    src: 'file-icon.png',
    type: VirtualDomElements.Img,
  })

  expect(result[6]).toEqual({
    childCount: 0,
    text: 'example.ts',
    type: VirtualDomElements.Text,
  })
})

test('getLocationsVirtualDom with multiple locations', () => {
  const locations: readonly DisplayReference[] = [
    {
      depth: 0,
      endOffset: undefined,
      icon: 'file-icon.png',
      index: 0,
      lineText: '',
      name: 'file1.ts',
      posInSet: 1,
      setSize: 1,
      startOffset: undefined,
      type: LocationType.Expanded,
      uri: 'file:///file1.ts',
    },
    {
      depth: 0,
      endOffset: 10,
      icon: 'file-icon.png',
      index: 1,
      lineText: 'const test = "value"',
      name: 'test.ts',
      posInSet: 1,
      setSize: 1,
      startOffset: 6,
      type: LocationType.Leaf,
      uri: 'file:///test.ts',
    },
    {
      depth: 0,
      endOffset: undefined,
      icon: 'file-icon.png',
      index: 2,
      lineText: '',
      name: 'file2.ts',
      posInSet: 1,
      setSize: 1,
      startOffset: undefined,
      type: LocationType.Collapsed,
      uri: 'file:///file2.ts',
    },
  ]
  const message = '3 results found'

  const result = GetLocationsVirtualDom.getLocationsVirtualDom(locations, message)

  expect(result[3]).toEqual({
    ariaDescribedBy: 'LocationsMessage',
    ariaLabel: LocationStrings.locations(),
    childCount: 3,
    className: ClassNames.LocationList,
    role: AriaRoles.Tree,
    tabIndex: 0,
    type: VirtualDomElements.Div,
  })

  // Check that all locations are included
  expect(result.length).toBeGreaterThan(4)
})

test('getLocationsVirtualDom with unknown location type', () => {
  const locations: readonly DisplayReference[] = [
    {
      depth: 0,
      endOffset: undefined,
      icon: 'file-icon.png',
      index: 0,
      lineText: '',
      name: 'unknown.ts',
      posInSet: 1,
      setSize: 1,
      startOffset: undefined,
      type: 999, // Unknown type
      uri: 'file:///unknown.ts',
    },
  ]
  const message = '1 result found'

  const result = GetLocationsVirtualDom.getLocationsVirtualDom(locations, message)

  // Should only have the container structure, no location nodes
  expect(result[3]).toEqual({
    ariaDescribedBy: 'LocationsMessage',
    ariaLabel: LocationStrings.locations(),
    childCount: 1,
    className: ClassNames.LocationList,
    role: AriaRoles.Tree,
    tabIndex: 0,
    type: VirtualDomElements.Div,
  })

  // No additional nodes after the container
  expect(result.length).toBe(4)
})
