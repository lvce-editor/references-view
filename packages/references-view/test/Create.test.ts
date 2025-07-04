import { test, expect } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.js'
import * as ReferencesStates from '../src/parts/ReferencesStates/ReferencesStates.js'

test('create - should initialize a new references state', () => {
  const id: number = 1
  const uri: string = 'file:///test.js'
  const x: number = 0
  const y: number = 0
  const width: number = 100
  const height: number = 100
  Create.create(id, uri, x, y, width, height)
  const state = ReferencesStates.get(id)
  expect(state).toBeDefined()
})
