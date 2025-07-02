import { test, expect, jest } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ActivateByEvent from '../src/parts/ActivateByEvent/ActivateByEvent.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('activateByEvent calls RendererWorker.invoke with correct parameters', async () => {
  const mockInvoke = jest.fn()

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })

  RendererWorker.set(mockRpc)

  const testEvent = 'onCommand:references.findReferences'
  await ActivateByEvent.activateByEvent(testEvent)

  expect(mockInvoke).toHaveBeenCalledWith('ExtensionHostManagement.activateByEvent', testEvent)
})

test('activateByEvent handles different event types', async () => {
  const mockInvoke = jest.fn()

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
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
    expect(mockInvoke).toHaveBeenCalledWith('ExtensionHostManagement.activateByEvent', event)
  }
})

test('activateByEvent returns Promise<void>', async () => {
  const mockInvoke = jest.fn().mockReturnValue(Promise.resolve())

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })

  RendererWorker.set(mockRpc)

  const result = ActivateByEvent.activateByEvent('test-event')
  expect(result).toBeInstanceOf(Promise)

  await result
})