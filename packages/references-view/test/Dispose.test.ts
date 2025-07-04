import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { dispose } from '../src/parts/Dispose/Dispose.ts'
import * as ReferencesStates from '../src/parts/ReferencesStates/ReferencesStates.ts'

test('dispose', async () => {
  const uid: number = 123
  const state = createDefaultState()
  ReferencesStates.set(uid, state, state)
  await dispose(uid)
  expect(ReferencesStates.get(uid)).toBeUndefined()
})
