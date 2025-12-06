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
    ...oldState,
    displayReferences: [],
    focusedIndex: 0,
    id: 3,
    message: 'Found 2 references',
    references: [
      { endOffset: 9, lineText: 'test line', startOffset: 5, uri: 'file:///test1.ts' },
      { endOffset: 5, lineText: 'another line', startOffset: 0, uri: 'file:///test2.ts' },
    ],
  }

  const result = RenderItems.renderItems(oldState, newState)

  expect(result).toEqual(['Viewlet.setDom2', 3, expect.any(Array)])
  expect(result[1]).toBe(3)
  expect(Array.isArray(result[2])).toBe(true)
})

test('renderItems uses newState for rendering', () => {
  const oldState: ReferencesState = {
    ...createDefaultState(),
    displayReferences: [],
    focusedIndex: 0,
    id: 1,
    message: 'Old message',
    references: [{ lineText: 'old line', uri: 'file:///old.ts' }],
  }
  const newState: ReferencesState = {
    ...oldState,
    displayReferences: [],
    focusedIndex: 1,
    id: 2,
    message: 'New message',
    references: [{ endOffset: 3, lineText: 'new line', startOffset: 0, uri: 'file:///new.ts' }],
  }

  const result = RenderItems.renderItems(oldState, newState)

  expect(result[1]).toBe(2)
  expect(result[2]).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        className: 'Viewlet Locations',
      }),
    ]),
  )
})
