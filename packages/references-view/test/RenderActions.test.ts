import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ReferencesStates from '../src/parts/ReferencesStates/ReferencesStates.ts'
import * as RenderActions from '../src/parts/RenderActions/RenderActions.ts'

test('renderActions disables actions when no editor is found', () => {
  const state = createDefaultState(1)
  ReferencesStates.set(1, state, state)
  const actions = RenderActions.renderActions(1)

  expect(actions.filter((node) => node.type === VirtualDomElements.Button).map((node) => node.disabled)).toEqual([true, true, true])
})

test('renderActions enables actions when an editor is found', () => {
  const state = { ...createDefaultState(2), editorFound: true }
  ReferencesStates.set(2, state, state)
  const actions = RenderActions.renderActions(2)

  expect(actions.filter((node) => node.type === VirtualDomElements.Button).map((node) => node.disabled)).toEqual([false, false, false])
})
