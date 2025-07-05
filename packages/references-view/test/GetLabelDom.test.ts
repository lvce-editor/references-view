import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplayReference } from '../src/parts/DisplayReference/DisplayReference.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetLabelDom from '../src/parts/GetLabelDom/GetLabelDom.ts'

test('getLabelDom - empty line', () => {
  const location: DisplayReference = {
    lineText: '',
    index: 0,
    startOffset: 0,
    endOffset: 0,
    uri: 'file:///test.ts',
    depth: 0,
    posInSet: 0,
    setSize: 1,
    type: 0,
    name: 'test',
    icon: 'test',
  }
  const result = GetLabelDom.getLabelDom(location)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.Label,
    childCount: 1,
  })
  expect(result[1]).toEqual({
    type: VirtualDomElements.Text,
    text: '(empty line)',
    childCount: 0,
  })
})

test('getLabelDom - with highlight', () => {
  const location: DisplayReference = {
    lineText: 'const test = "hello"',
    index: 0,
    startOffset: 10,
    endOffset: 15,
    uri: 'file:///test.ts',
    depth: 0,
    posInSet: 0,
    setSize: 1,
    type: 0,
    name: 'test',
    icon: 'test',
  }
  const result = GetLabelDom.getLabelDom(location)
  expect(result).toHaveLength(5)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.Label,
    childCount: 3,
  })
  expect(result[1]).toEqual({
    type: VirtualDomElements.Text,
    text: 'const test',
    childCount: 0,
  })
  expect(result[2]).toEqual({
    type: VirtualDomElements.Span,
    className: ClassNames.Highlight,
    childCount: 1,
  })
  expect(result[3]).toEqual({
    type: VirtualDomElements.Text,
    text: ' = "h',
    childCount: 0,
  })
  expect(result[4]).toEqual({
    type: VirtualDomElements.Text,
    text: 'ello"',
    childCount: 0,
  })
})
