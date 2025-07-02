import { test, expect } from '@jest/globals'
import * as GetDisplayReferences from '../src/parts/GetDisplayReferences/GetDisplayReferences.ts'
import * as LocationType from '../src/parts/LocationType/LocationType.ts'

test('getDisplayReferences with empty references', () => {
  const references: readonly any[] = []
  const result = GetDisplayReferences.getDisplayReferences(references)
  expect(result).toEqual([])
})

test('getDisplayReferences with single reference', () => {
  const references: readonly any[] = [
    {
      uri: '/path/to/file.ts',
      lineText: 'const example = "test"',
      startColumnIndex: 6,
      endColumnIndex: 13,
    },
  ]

  const result = GetDisplayReferences.getDisplayReferences(references)

  expect(result).toHaveLength(2)

  // Check file header
  expect(result[0]).toEqual({
    depth: 1,
    posInSet: 1,
    setSize: 1,
    type: LocationType.Expanded,
    uri: '/path/to/file.ts',
    name: 'file.ts',
    lineText: '',
    icon: '',
    index: 0,
    startOffset: 0,
    endOffset: 0,
  })

  // Check leaf reference
  expect(result[1]).toEqual({
    depth: 2,
    posInSet: 1,
    setSize: 1,
    type: LocationType.Leaf,
    uri: '',
    name: '',
    lineText: 'const example = "test"',
    icon: '',
    index: 1,
    startOffset: 6,
    endOffset: 13,
  })
})

test('getDisplayReferences with multiple references in same file', () => {
  const references: readonly any[] = [
    {
      uri: '/path/to/file.ts',
      lineText: 'const example = "test"',
      startColumnIndex: 6,
      endColumnIndex: 13,
    },
    {
      uri: '/path/to/file.ts',
      lineText: 'const another = "value"',
      startColumnIndex: 6,
      endColumnIndex: 13,
    },
  ]

  const result = GetDisplayReferences.getDisplayReferences(references)

  expect(result).toHaveLength(3)

  // Check file header
  expect(result[0]).toEqual({
    depth: 1,
    posInSet: 1,
    setSize: 1,
    type: LocationType.Expanded,
    uri: '/path/to/file.ts',
    name: 'file.ts',
    lineText: '',
    icon: '',
    index: 0,
    startOffset: 0,
    endOffset: 0,
  })

  // Check first leaf reference
  expect(result[1]).toEqual({
    depth: 2,
    posInSet: 1,
    setSize: 1,
    type: LocationType.Leaf,
    uri: '',
    name: '',
    lineText: 'const example = "test"',
    icon: '',
    index: 1,
    startOffset: 6,
    endOffset: 13,
  })

  // Check second leaf reference
  expect(result[2]).toEqual({
    depth: 2,
    posInSet: 2,
    setSize: 1,
    type: LocationType.Leaf,
    uri: '',
    name: '',
    lineText: 'const another = "value"',
    icon: '',
    index: 2,
    startOffset: 6,
    endOffset: 13,
  })
})

test('getDisplayReferences with references from different files', () => {
  const references: readonly any[] = [
    {
      uri: '/path/to/file1.ts',
      lineText: 'const example = "test"',
      startColumnIndex: 6,
      endColumnIndex: 13,
    },
    {
      uri: '/path/to/file2.ts',
      lineText: 'const another = "value"',
      startColumnIndex: 6,
      endColumnIndex: 13,
    },
  ]

  const result = GetDisplayReferences.getDisplayReferences(references)

  expect(result).toHaveLength(4)

  // Check first file header
  expect(result[0]).toEqual({
    depth: 1,
    posInSet: 1,
    setSize: 1,
    type: LocationType.Expanded,
    uri: '/path/to/file1.ts',
    name: 'file1.ts',
    lineText: '',
    icon: '',
    index: 0,
    startOffset: 0,
    endOffset: 0,
  })

  // Check first leaf reference
  expect(result[1]).toEqual({
    depth: 2,
    posInSet: 1,
    setSize: 1,
    type: LocationType.Leaf,
    uri: '',
    name: '',
    lineText: 'const example = "test"',
    icon: '',
    index: 1,
    startOffset: 6,
    endOffset: 13,
  })

  // Check second file header
  expect(result[2]).toEqual({
    depth: 1,
    posInSet: 2,
    setSize: 1,
    type: LocationType.Expanded,
    uri: '/path/to/file2.ts',
    name: 'file2.ts',
    lineText: '',
    icon: '',
    index: 2,
    startOffset: 0,
    endOffset: 0,
  })

  // Check second leaf reference
  expect(result[3]).toEqual({
    depth: 2,
    posInSet: 1,
    setSize: 1,
    type: LocationType.Leaf,
    uri: '',
    name: '',
    lineText: 'const another = "value"',
    icon: '',
    index: 3,
    startOffset: 6,
    endOffset: 13,
  })
})

test('getDisplayReferences with startOffset and endOffset instead of column indices', () => {
  const references: readonly any[] = [
    {
      uri: '/path/to/file.ts',
      lineText: 'const example = "test"',
      startOffset: 10,
      endOffset: 17,
    },
  ]

  const result = GetDisplayReferences.getDisplayReferences(references)

  expect(result[1]).toEqual({
    depth: 2,
    posInSet: 1,
    setSize: 1,
    type: LocationType.Leaf,
    uri: '',
    name: '',
    lineText: 'const example = "test"',
    icon: '',
    index: 1,
    startOffset: 10,
    endOffset: 17,
  })
})

test('getDisplayReferences with empty lineText', () => {
  const references: readonly any[] = [
    {
      uri: '/path/to/file.ts',
      lineText: '',
      startColumnIndex: 0,
      endColumnIndex: 0,
    },
  ]

  const result = GetDisplayReferences.getDisplayReferences(references)

  expect(result[1]).toEqual({
    depth: 2,
    posInSet: 1,
    setSize: 1,
    type: LocationType.Leaf,
    uri: '',
    name: '',
    lineText: '',
    icon: '',
    index: 1,
    startOffset: undefined,
    endOffset: undefined,
  })
})

test('getDisplayReferences with missing lineText', () => {
  const references: readonly any[] = [
    {
      uri: '/path/to/file.ts',
      startColumnIndex: 6,
      endColumnIndex: 13,
    },
  ]

  const result = GetDisplayReferences.getDisplayReferences(references)

  expect(result[1]).toEqual({
    depth: 2,
    posInSet: 1,
    setSize: 1,
    type: LocationType.Leaf,
    uri: '',
    name: '',
    lineText: '',
    icon: '',
    index: 1,
    startOffset: 6,
    endOffset: 13,
  })
})

test('getDisplayReferences with file path without extension', () => {
  const references: readonly any[] = [
    {
      uri: '/path/to/file',
      lineText: 'const example = "test"',
      startColumnIndex: 6,
      endColumnIndex: 13,
    },
  ]

  const result = GetDisplayReferences.getDisplayReferences(references)

  expect(result[0]).toEqual({
    depth: 1,
    posInSet: 1,
    setSize: 1,
    type: LocationType.Expanded,
    uri: '/path/to/file',
    name: 'file',
    lineText: '',
    icon: '',
    index: 0,
    startOffset: 0,
    endOffset: 0,
  })
})

test('getDisplayReferences with empty uri', () => {
  const references: readonly any[] = [
    {
      uri: '',
      lineText: 'const example = "test"',
      startColumnIndex: 6,
      endColumnIndex: 13,
    },
  ]

  const result = GetDisplayReferences.getDisplayReferences(references)

  expect(result[0]).toEqual({
    depth: 2,
    posInSet: 1,
    setSize: 1,
    type: LocationType.Leaf,
    uri: '',
    name: '',
    lineText: 'const example = "test"',
    icon: '',
    index: 0,
    startOffset: 6,
    endOffset: 13,
  })
})

test('getDisplayReferences with complex file structure', () => {
  const references: readonly any[] = [
    {
      uri: '/path/to/file1.ts',
      lineText: 'const example = "test"',
      startColumnIndex: 6,
      endColumnIndex: 13,
    },
    {
      uri: '/path/to/file1.ts',
      lineText: 'const another = "value"',
      startColumnIndex: 6,
      endColumnIndex: 13,
    },
    {
      uri: '/path/to/file2.ts',
      lineText: 'const third = "item"',
      startColumnIndex: 6,
      endColumnIndex: 11,
    },
    {
      uri: '/path/to/file1.ts',
      lineText: 'const fourth = "last"',
      startColumnIndex: 6,
      endColumnIndex: 12,
    },
  ]

  const result = GetDisplayReferences.getDisplayReferences(references)

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
