import { expect, test } from '@jest/globals'
import * as RenderActions from '../src/parts/RenderActions/RenderActions.ts'

test('renderActions returns correct action buttons', () => {
  const actions = RenderActions.renderActions()

  expect(actions).toBeDefined()
})
