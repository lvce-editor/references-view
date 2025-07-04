import * as RendererWorker from '../RendererWorker/RendererWorker.ts'
import { toSimpleIconRequest } from '../ToSimpleIconRequest/ToSimpleIconRequest.ts'

// TODO add more exact types
export const requestFileIcons = async (references: readonly any[]): Promise<readonly string[]> => {
  if (references.length === 0) {
    return []
  }
  const simpleRequests = references.map(toSimpleIconRequest)
  const icons = await RendererWorker.getIcons(simpleRequests)
  return icons
}
