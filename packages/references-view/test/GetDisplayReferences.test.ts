import { test, expect } from '@jest/globals'
import type { Reference } from '../src/parts/Reference/Reference.ts'
import * as GetDisplayReferences from '../src/parts/GetDisplayReferences/GetDisplayReferences.ts'
import * as LocationType from '../src/parts/LocationType/LocationType.ts'

test('getDisplayReferences with empty references', () => {
  const references: readonly Reference[] = []

  const collapsedUris: readonly string[] = []
  const result = GetDisplayReferences.getDisplayReferences(references, [], collapsedUris)
  expect(result).toEqual([])
})

test('getDisplayReferences with single reference', () => {
  const references: readonly Reference[] = [
    {
      endColumnIndex: 13,
      lineText: 'const example = "test"',
      startColumnIndex: 6,
      uri: '/path/to/file.ts',
    },
  ]

  const collapsedUris: readonly string[] = []

  const result = GetDisplayReferences.getDisplayReferences(references, [''], collapsedUris)

  expect(result).toHaveLength(2)

  // Check file header
  expect(result[0]).toEqual({
    depth: 1,
    endOffset: 0,
    icon: '',
    index: 0,
    lineText: '',
    name: 'file.ts',
    posInSet: 1,
    setSize: 1,
    startOffset: 0,
    type: LocationType.Expanded,
    uri: '/path/to/file.ts',
  })

  // Check leaf reference
  expect(result[1]).toEqual({
    depth: 2,
    endOffset: 13,
    icon: '',
    index: 1,
    lineText: 'const example = "test"',
    name: '',
    posInSet: 1,
    setSize: 1,
    startOffset: 6,
    type: LocationType.Leaf,
    uri: '',
  })
})

test('getDisplayReferences with multiple references in same file', () => {
  const references: readonly Reference[] = [
    {
      endColumnIndex: 13,
      lineText: 'const example = "test"',
      startColumnIndex: 6,
      uri: '/path/to/file.ts',
    },
    {
      endColumnIndex: 13,
      lineText: 'const another = "value"',
      startColumnIndex: 6,
      uri: '/path/to/file.ts',
    },
  ]

  const collapsedUris: readonly string[] = []

  const result = GetDisplayReferences.getDisplayReferences(references, ['', ''], collapsedUris)

  expect(result).toHaveLength(3)

  // Check file header
  expect(result[0]).toEqual({
    depth: 1,
    endOffset: 0,
    icon: '',
    index: 0,
    lineText: '',
    name: 'file.ts',
    posInSet: 1,
    setSize: 1,
    startOffset: 0,
    type: LocationType.Expanded,
    uri: '/path/to/file.ts',
  })

  // Check first leaf reference
  expect(result[1]).toEqual({
    depth: 2,
    endOffset: 13,
    icon: '',
    index: 1,
    lineText: 'const example = "test"',
    name: '',
    posInSet: 1,
    setSize: 1,
    startOffset: 6,
    type: LocationType.Leaf,
    uri: '',
  })

  // Check second leaf reference
  expect(result[2]).toEqual({
    depth: 2,
    endOffset: 13,
    icon: '',
    index: 2,
    lineText: 'const another = "value"',
    name: '',
    posInSet: 2,
    setSize: 1,
    startOffset: 6,
    type: LocationType.Leaf,
    uri: '',
  })
})

test('getDisplayReferences with references from different files', () => {
  const references: readonly Reference[] = [
    {
      endColumnIndex: 13,
      lineText: 'const example = "test"',
      startColumnIndex: 6,
      uri: '/path/to/file1.ts',
    },
    {
      endColumnIndex: 13,
      lineText: 'const another = "value"',
      startColumnIndex: 6,
      uri: '/path/to/file2.ts',
    },
  ]

  const collapsedUris: readonly string[] = []

  const result = GetDisplayReferences.getDisplayReferences(references, ['', ''], collapsedUris)

  expect(result).toHaveLength(4)

  // Check first file header
  expect(result[0]).toEqual({
    depth: 1,
    endOffset: 0,
    icon: '',
    index: 0,
    lineText: '',
    name: 'file1.ts',
    posInSet: 1,
    setSize: 1,
    startOffset: 0,
    type: LocationType.Expanded,
    uri: '/path/to/file1.ts',
  })

  // Check first leaf reference
  expect(result[1]).toEqual({
    depth: 2,
    endOffset: 13,
    icon: '',
    index: 1,
    lineText: 'const example = "test"',
    name: '',
    posInSet: 1,
    setSize: 1,
    startOffset: 6,
    type: LocationType.Leaf,
    uri: '',
  })

  // Check second file header
  expect(result[2]).toEqual({
    depth: 1,
    endOffset: 0,
    icon: '',
    index: 2,
    lineText: '',
    name: 'file2.ts',
    posInSet: 2,
    setSize: 1,
    startOffset: 0,
    type: LocationType.Expanded,
    uri: '/path/to/file2.ts',
  })

  // Check second leaf reference
  expect(result[3]).toEqual({
    depth: 2,
    endOffset: 13,
    icon: '',
    index: 3,
    lineText: 'const another = "value"',
    name: '',
    posInSet: 1,
    setSize: 1,
    startOffset: 6,
    type: LocationType.Leaf,
    uri: '',
  })
})

test('getDisplayReferences with startOffset and endOffset instead of column indices', () => {
  const references: readonly Reference[] = [
    {
      endOffset: 17,
      lineText: 'const example = "test"',
      startOffset: 10,
      uri: '/path/to/file.ts',
    },
  ]

  const collapsedUris: readonly string[] = []

  const result = GetDisplayReferences.getDisplayReferences(references, [''], collapsedUris)

  expect(result[1]).toEqual({
    depth: 2,
    endOffset: 17,
    icon: '',
    index: 1,
    lineText: 'const example = "test"',
    name: '',
    posInSet: 1,
    setSize: 1,
    startOffset: 10,
    type: LocationType.Leaf,
    uri: '',
  })
})

test('getDisplayReferences with empty lineText', () => {
  const references: readonly Reference[] = [
    {
      endColumnIndex: 0,
      lineText: '',
      startColumnIndex: 0,
      uri: '/path/to/file.ts',
    },
  ]

  const collapsedUris: readonly string[] = []

  const result = GetDisplayReferences.getDisplayReferences(references, [''], collapsedUris)

  expect(result[1]).toEqual({
    depth: 2,
    endOffset: undefined,
    icon: '',
    index: 1,
    lineText: '',
    name: '',
    posInSet: 1,
    setSize: 1,
    startOffset: undefined,
    type: LocationType.Leaf,
    uri: '',
  })
})

test('getDisplayReferences with missing lineText', () => {
  const references: readonly Reference[] = [
    {
      endColumnIndex: 13,
      startColumnIndex: 6,
      uri: '/path/to/file.ts',
    },
  ]

  const collapsedUris: readonly string[] = []

  const result = GetDisplayReferences.getDisplayReferences(references, [''], collapsedUris)

  expect(result[1]).toEqual({
    depth: 2,
    endOffset: 13,
    icon: '',
    index: 1,
    lineText: '',
    name: '',
    posInSet: 1,
    setSize: 1,
    startOffset: 6,
    type: LocationType.Leaf,
    uri: '',
  })
})

test('getDisplayReferences with file path without extension', () => {
  const references: readonly Reference[] = [
    {
      endColumnIndex: 13,
      lineText: 'const example = "test"',
      startColumnIndex: 6,
      uri: '/path/to/file',
    },
  ]

  const collapsedUris: readonly string[] = []

  const result = GetDisplayReferences.getDisplayReferences(references, [''], collapsedUris)

  expect(result[0]).toEqual({
    depth: 1,
    endOffset: 0,
    icon: '',
    index: 0,
    lineText: '',
    name: 'file',
    posInSet: 1,
    setSize: 1,
    startOffset: 0,
    type: LocationType.Expanded,
    uri: '/path/to/file',
  })
})

test('getDisplayReferences with empty uri', () => {
  const references: readonly Reference[] = [
    {
      endColumnIndex: 13,
      lineText: 'const example = "test"',
      startColumnIndex: 6,
      uri: '',
    },
  ]

  const collapsedUris: readonly string[] = []

  const result = GetDisplayReferences.getDisplayReferences(references, [''], collapsedUris)

  expect(result[0]).toEqual({
    depth: 2,
    endOffset: 13,
    icon: '',
    index: 0,
    lineText: 'const example = "test"',
    name: '',
    posInSet: 1,
    setSize: 1,
    startOffset: 6,
    type: LocationType.Leaf,
    uri: '',
  })
})

test('getDisplayReferences with complex file structure', () => {
  const references: readonly Reference[] = [
    {
      endColumnIndex: 13,
      lineText: 'const example = "test"',
      startColumnIndex: 6,
      uri: '/path/to/file1.ts',
    },
    {
      endColumnIndex: 13,
      lineText: 'const another = "value"',
      startColumnIndex: 6,
      uri: '/path/to/file1.ts',
    },
    {
      endColumnIndex: 11,
      lineText: 'const third = "item"',
      startColumnIndex: 6,
      uri: '/path/to/file2.ts',
    },
    {
      endColumnIndex: 12,
      lineText: 'const fourth = "last"',
      startColumnIndex: 6,
      uri: '/path/to/file1.ts',
    },
  ]

  const collapsedUris: readonly string[] = []

  const result = GetDisplayReferences.getDisplayReferences(references, ['', '', '', ''], collapsedUris)

  expect(result).toHaveLength(7)

  // First file header
  expect(result[0].uri).toBe('/path/to/file1.ts')
  expect(result[0].name).toBe('file1.ts')
  expect(result[0].posInSet).toBe(1)

  // First file references
  expect(result[1].lineText).toBe('const example = "test"')
  expect(result[1].posInSet).toBe(1)
  expect(result[2].lineText).toBe('const another = "value"')
  expect(result[2].posInSet).toBe(2)

  // Second file header
  expect(result[3].uri).toBe('/path/to/file2.ts')
  expect(result[3].name).toBe('file2.ts')
  expect(result[3].posInSet).toBe(2)

  // Second file reference
  expect(result[4].lineText).toBe('const third = "item"')
  expect(result[4].posInSet).toBe(1)

  // Back to first file (new header)
  expect(result[5].uri).toBe('/path/to/file1.ts')
  expect(result[5].name).toBe('file1.ts')
  expect(result[5].posInSet).toBe(3)
  expect(result[6].lineText).toBe('const fourth = "last"')
  expect(result[6].posInSet).toBe(1)
})
