import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as Diff2 from '../src/parts/Diff2/Diff2.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as ReferencesStates from '../src/parts/ReferencesStates/ReferencesStates.ts'

test('diff2 returns empty array when states are equal', () => {
  const uid = 1
  const state = createDefaultState()
  ReferencesStates.set(uid, state, state)
  const result = Diff2.diff2(uid)
  expect(result).toEqual([])
})

test('diff2 returns diff type when states are different', () => {
  const uid = 2
  const oldState = createDefaultState(uid)
  const newState = {
    ...oldState,
    references: [{ uri: 'file:///test.ts', lineText: 'test' }],
  }
  ReferencesStates.set(uid, oldState, newState)

  const result = Diff2.diff2(uid)

  expect(result).toEqual([DiffType.RenderItems])
})

test('diff2 uses states from ReferencesStates', () => {
  const uid = 3
  const oldState = createDefaultState(uid)
  const newState = {
    ...oldState,
    message: 'Different message',
    references: [{ uri: 'file:///test.ts', lineText: 'test' }],
  }
  ReferencesStates.set(uid, oldState, newState)

  const result = Diff2.diff2(uid)

  expect(result).toEqual([DiffType.RenderItems])
})
