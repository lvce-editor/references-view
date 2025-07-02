import { test, expect } from '@jest/globals'
import type { ReferencesState } from '../src/parts/ReferencesState/ReferencesState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'

test('renderItems returns correct ViewletCommand with empty state', () => {
  const oldState: ReferencesState = createDefaultState(1)
  const newState: ReferencesState = createDefaultState(2)

  const result = RenderItems.renderItems(oldState, newState)

  expect(result).toEqual(['Viewlet.setDom2', 2, expect.any(Array)])
  expect(result[1]).toBe(2)
  expect(Array.isArray(result[2])).toBe(true)
})

test('renderItems returns correct ViewletCommand with references', () => {
  const oldState: ReferencesState = createDefaultState(1)
  const newState: ReferencesState = {
    id: 3,
    message: 'Found 2 references',
    references: [
      { uri: 'file:///test1.ts', lineText: 'test line', startOffset: 5, endOffset: 9 },
      { uri: 'file:///test2.ts', lineText: 'another line', startOffset: 0, endOffset: 5 }
    ],
    displayReferences: [],
    focusedIndex: 0
  }

  const result = RenderItems.renderItems(oldState, newState)

  expect(result).toEqual(['Viewlet.setDom2', 3, expect.any(Array)])
  expect(result[1]).toBe(3)
  expect(Array.isArray(result[2])).toBe(true)
})

test('renderItems uses newState for rendering', () => {
  const oldState: ReferencesState = {
    id: 1,
    message: 'Old message',
    references: [{ uri: 'file:///old.ts', lineText: 'old line' }],
    displayReferences: [],
    focusedIndex: 0
  }
  const newState: ReferencesState = {
    id: 2,
    message: 'New message',
    references: [{ uri: 'file:///new.ts', lineText: 'new line', startOffset: 0, endOffset: 3 }],
    displayReferences: [],
    focusedIndex: 1
  }

  const result = RenderItems.renderItems(oldState, newState)

  expect(result[1]).toBe(2)
  expect(result[2]).toEqual(expect.arrayContaining([
    expect.objectContaining({
      className: 'Viewlet Locations'
    })
  ]))
})