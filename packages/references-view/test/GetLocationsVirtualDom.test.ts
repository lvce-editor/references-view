import { test, expect } from '@jest/globals'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetLocationsVirtualDom from '../src/parts/GetLocationsVirtualDom/GetLocationsVirtualDom.ts'
import * as LocationStrings from '../src/parts/LocationStrings/LocationsStrings.ts'
import * as LocationType from '../src/parts/LocationType/LocationType.ts'

test('getLocationsVirtualDom with empty locations', () => {
  const locations: readonly any[] = []
  const message = 'No results found'

  const result = GetLocationsVirtualDom.getLocationsVirtualDom(locations, message)

  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: 'Viewlet Locations',
      onMouseDown: 'handleClickReference',
      childCount: 2,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.LocationsMessage,
      id: 'LocationsMessage',
      role: AriaRoles.Status,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: message,
      childCount: 0,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.LocationList,
      role: AriaRoles.Tree,
      ariaLabel: LocationStrings.locations(),
      tabIndex: 0,
      ariaDescribedBy: 'LocationsMessage',
      childCount: 0,
    },
  ])
})

test('getLocationsVirtualDom with leaf location', () => {
  const locations: readonly any[] = [
    {
      type: LocationType.Leaf,
      lineText: 'const example = "test"',
      index: 0,
      startOffset: 6,
      endOffset: 13,
    },
  ]
  const message = '1 result found'

  const result = GetLocationsVirtualDom.getLocationsVirtualDom(locations, message)

  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: 'Viewlet Locations',
    onMouseDown: 'handleClickReference',
    childCount: 2,
  })

  expect(result[1]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.LocationsMessage,
    id: 'LocationsMessage',
    role: AriaRoles.Status,
    childCount: 1,
  })

  expect(result[2]).toEqual({
    type: VirtualDomElements.Text,
    text: message,
    childCount: 0,
  })

  expect(result[3]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.LocationList,
    role: AriaRoles.Tree,
    ariaLabel: LocationStrings.locations(),
    tabIndex: 0,
    ariaDescribedBy: 'LocationsMessage',
    childCount: 1,
  })

  // Check the leaf location structure
  expect(result[4]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.TreeItem,
    id: 'Reference-0',
    'data-index': 0,
    role: 'treeitem',
    childCount: 1,
    paddingLeft: '2rem',
  })

  expect(result[5]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.Label,
    childCount: 3,
  })

  expect(result[6]).toEqual({
    type: VirtualDomElements.Text,
    text: 'const ',
    childCount: 0,
  })

  expect(result[7]).toEqual({
    type: VirtualDomElements.Span,
    className: ClassNames.Highlight,
    childCount: 1,
  })

  expect(result[8]).toEqual({
    type: VirtualDomElements.Text,
    text: 'example',
    childCount: 0,
  })

  expect(result[9]).toEqual({
    type: VirtualDomElements.Text,
    text: ' = "test"',
    childCount: 0,
  })
})

test('getLocationsVirtualDom with leaf location empty line', () => {
  const locations: readonly any[] = [
    {
      type: LocationType.Leaf,
      lineText: '',
      index: 0,
      startOffset: 0,
      endOffset: 0,
    },
  ]
  const message = '1 result found'

  const result = GetLocationsVirtualDom.getLocationsVirtualDom(locations, message)

  // Check the leaf location structure for empty line
  expect(result[4]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.TreeItem,
    id: 'Reference-0',
    'data-index': 0,
    role: 'treeitem',
    childCount: 1,
    paddingLeft: '2rem',
  })

  expect(result[5]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.Label,
    childCount: 1,
  })

  expect(result[6]).toEqual({
    type: VirtualDomElements.Text,
    text: '(empty line)',
    childCount: 0,
  })
})

test('getLocationsVirtualDom with collapsed location', () => {
  const locations: readonly any[] = [
    {
      type: LocationType.Collapsed,
      index: 0,
      name: 'example.ts',
    },
  ]
  const message = '1 file found'

  const result = GetLocationsVirtualDom.getLocationsVirtualDom(locations, message)

  // Check the collapsed location structure
  expect(result[4]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.TreeItem,
    ariaExpanded: false,
    id: 'Reference-0',
    'data-index': 0,
    role: 'treeitem',
    childCount: 1,
  })

  expect(result[5]).toEqual({
    type: VirtualDomElements.Text,
    text: 'example.ts',
    childCount: 0,
  })
})

test('getLocationsVirtualDom with expanded location', () => {
  const locations: readonly any[] = [
    {
      type: LocationType.Expanded,
      index: 0,
      name: 'example.ts',
      icon: 'file-icon.png',
    },
  ]
  const message = '1 file found'

  const result = GetLocationsVirtualDom.getLocationsVirtualDom(locations, message)

  // Check the expanded location structure
  expect(result[4]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.TreeItem,
    ariaExpanded: true,
    id: 'Reference-0',
    'data-index': 0,
    role: 'treeitem',
    childCount: 2,
    paddingLeft: '1rem',
  })

  expect(result[5]).toEqual({
    type: VirtualDomElements.Img,
    className: ClassNames.FileIcon,
    src: 'file-icon.png',
  })

  expect(result[6]).toEqual({
    type: VirtualDomElements.Text,
    text: 'example.ts',
    childCount: 0,
  })
})

test('getLocationsVirtualDom with multiple locations', () => {
  const locations: readonly any[] = [
    {
      type: LocationType.Expanded,
      index: 0,
      name: 'file1.ts',
      icon: 'file-icon.png',
    },
    {
      type: LocationType.Leaf,
      lineText: 'const test = "value"',
      index: 1,
      startOffset: 6,
      endOffset: 10,
    },
    {
      type: LocationType.Collapsed,
      index: 2,
      name: 'file2.ts',
    },
  ]
  const message = '3 results found'

  const result = GetLocationsVirtualDom.getLocationsVirtualDom(locations, message)

  expect(result[3]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.LocationList,
    role: AriaRoles.Tree,
    ariaLabel: LocationStrings.locations(),
    tabIndex: 0,
    ariaDescribedBy: 'LocationsMessage',
    childCount: 3,
  })

  // Check that all locations are included
  expect(result.length).toBeGreaterThan(4)
})

test('getLocationsVirtualDom with unknown location type', () => {
  const locations: readonly any[] = [
    {
      type: 999, // Unknown type
      index: 0,
      name: 'unknown.ts',
    },
  ]
  const message = '1 result found'

  const result = GetLocationsVirtualDom.getLocationsVirtualDom(locations, message)

  // Should only have the container structure, no location nodes
  expect(result[3]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.LocationList,
    role: AriaRoles.Tree,
    ariaLabel: LocationStrings.locations(),
    tabIndex: 0,
    ariaDescribedBy: 'LocationsMessage',
    childCount: 1,
  })

  // No additional nodes after the container
  expect(result.length).toBe(4)
})
