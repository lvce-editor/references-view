import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as GetReferencesWithPreview from '../src/parts/GetReferencesWithPreview/GetReferencesWithPreview.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('getReferencesWithPreview reads result files in the originating application', async () => {
  const calls: unknown[][] = []
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly unknown[]) => {
      calls.push([method, ...args])
      return 'let color = blue'
    },
  })
  RendererWorker.set(mockRpc)

  const references = await GetReferencesWithPreview.getReferencesWithPreview(
    [{ endColumnIndex: 9, endRowIndex: 0, startColumnIndex: 4, startRowIndex: 0, uri: 'memfs:///preview/example.txt' }],
    'preview',
  )

  expect(calls).toEqual([['Application.execute', 'preview', 'FileSystem.readFile', 'memfs:///preview/example.txt']])
  expect(references).toEqual([
    {
      endColumnIndex: 9,
      endRowIndex: 0,
      lineText: 'let color = blue',
      startColumnIndex: 4,
      startRowIndex: 0,
      uri: 'memfs:///preview/example.txt',
    },
  ])
})
