import { test, expect } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.js'
import * as ReferencesStates from '../src/parts/ReferencesStates/ReferencesStates.js'

test('create - should initialize a new references state', () => {
  const id = 1
  const uri = 'file:///test.js'
  const x = 0
  const y = 0
  const width = 100
  const height = 100
  Create.create(id, uri, x, y, width, height)
  const state = ReferencesStates.get(id)
  expect(state).toBeDefined()
})
