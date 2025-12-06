import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplayReference } from '../src/parts/DisplayReference/DisplayReference.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetLabelDom from '../src/parts/GetLabelDom/GetLabelDom.ts'

test('getLabelDom - empty line', () => {
  const location: DisplayReference = {
    depth: 0,
    endOffset: 0,
    icon: 'test',
    index: 0,
    lineText: '',
    name: 'test',
    posInSet: 0,
    setSize: 1,
    startOffset: 0,
    type: 0,
    uri: 'file:///test.ts',
  }
  const result = GetLabelDom.getLabelDom(location)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.Label,
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    text: '(empty line)',
    type: VirtualDomElements.Text,
  })
})

test('getLabelDom - with highlight', () => {
  const location: DisplayReference = {
    depth: 0,
    endOffset: 15,
    icon: 'test',
    index: 0,
    lineText: 'const test = "hello"',
    name: 'test',
    posInSet: 0,
    setSize: 1,
    startOffset: 10,
    type: 0,
    uri: 'file:///test.ts',
  }
  const result = GetLabelDom.getLabelDom(location)
  expect(result).toHaveLength(5)
  expect(result[0]).toEqual({
    childCount: 3,
    className: ClassNames.Label,
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    text: 'const test',
    type: VirtualDomElements.Text,
  })
  expect(result[2]).toEqual({
    childCount: 1,
    className: ClassNames.Highlight,
    type: VirtualDomElements.Span,
  })
  expect(result[3]).toEqual({
    childCount: 0,
    text: ' = "h',
    type: VirtualDomElements.Text,
  })
  expect(result[4]).toEqual({
    childCount: 0,
    text: 'ello"',
    type: VirtualDomElements.Text,
  })
})
