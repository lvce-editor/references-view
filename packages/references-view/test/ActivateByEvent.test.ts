import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ActivateByEvent from '../src/parts/ActivateByEvent/ActivateByEvent.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('activateByEvent calls RendererWorker.invoke with correct parameters', async () => {
  let invokedMethod: string | undefined
  let invokedEvent: string | undefined

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, event: string) => {
      invokedMethod = method
      invokedEvent = event
      return undefined
    },
  })

  RendererWorker.set(mockRpc)

  const testEvent = 'onCommand:references.findReferences'
  await ActivateByEvent.activateByEvent(testEvent)

  expect(invokedMethod).toBe('ExtensionHostManagement.activateByEvent')
  expect(invokedEvent).toBe(testEvent)
})

test('activateByEvent handles different event types', async () => {
  let invokedEvent: string | undefined

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, event: string) => {
      invokedEvent = event
      return undefined
    },
  })

  RendererWorker.set(mockRpc)

  const events = [
    'onCommand:references.findReferences',
    'onCommand:references.findImplementations',
    'onCommand:references.findDeclarations',
    'onView:references',
  ]

  for (const event of events) {
    await ActivateByEvent.activateByEvent(event)
    expect(invokedEvent).toBe(event)
  }
})

test('activateByEvent returns Promise<void>', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: () => {
      return Promise.resolve()
    },
  })

  RendererWorker.set(mockRpc)

  const result = ActivateByEvent.activateByEvent('test-event')
  expect(result).toBeInstanceOf(Promise)

  await result
})