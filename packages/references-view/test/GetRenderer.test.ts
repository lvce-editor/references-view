import { test, expect } from '@jest/globals'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as GetRenderer from '../src/parts/GetRenderer/GetRenderer.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'

test('getRenderer returns renderItems for RenderItems diff type', () => {
  const renderer = GetRenderer.getRenderer(DiffType.RenderItems)

  expect(renderer).toBe(RenderItems.renderItems)
})

test('getRenderer throws error for unknown diff type', () => {
  const unknownDiffType = 999

  expect(() => {
    GetRenderer.getRenderer(unknownDiffType)
  }).toThrow('unknown renderer')
})

test('getRenderer throws error for RenderFocus diff type', () => {
  expect(() => {
    GetRenderer.getRenderer(DiffType.RenderFocus)
  }).toThrow('unknown renderer')
})

test('getRenderer throws error for RenderValue diff type', () => {
  expect(() => {
    GetRenderer.getRenderer(DiffType.RenderValue)
  }).toThrow('unknown renderer')
})

test('getRenderer throws error for RenderReplaceValue diff type', () => {
  expect(() => {
    GetRenderer.getRenderer(DiffType.RenderReplaceValue)
  }).toThrow('unknown renderer')
})

test('getRenderer throws error for RenderIncludeValue diff type', () => {
  expect(() => {
    GetRenderer.getRenderer(DiffType.RenderIncludeValue)
  }).toThrow('unknown renderer')
})

test('getRenderer throws error for RenderExcludeValue diff type', () => {
  expect(() => {
    GetRenderer.getRenderer(DiffType.RenderExcludeValue)
  }).toThrow('unknown renderer')
})

test('getRenderer throws error for RenderFocusContext diff type', () => {
  expect(() => {
    GetRenderer.getRenderer(DiffType.RenderFocusContext)
  }).toThrow('unknown renderer')
})

test('getRenderer throws error for RenderSelection diff type', () => {
  expect(() => {
    GetRenderer.getRenderer(DiffType.RenderSelection)
  }).toThrow('unknown renderer')
})

test('getRenderer throws error for RenderPauseOnExceptions diff type', () => {
  expect(() => {
    GetRenderer.getRenderer(DiffType.RenderPauseOnExceptions)
  }).toThrow('unknown renderer')
})
