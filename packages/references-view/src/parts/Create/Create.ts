import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import * as ReferencesStates from '../ReferencesStates/ReferencesStates.ts'

export const create = (
  id: number,
  uri: string,
  x: number,
  y: number,
  width: number,
  height: number,
  assetDir: string,
  platform: number,
  applicationId?: string,
): void => {
  const state: ReferencesState = {
    assetDir,
    collapsedUris: [],
    displayReferences: [],
    fileIconCache: {},
    focusedIndex: -1,
    id,
    initial: true,
    languageId: '',
    message: '',
    offset: -1,
    platform,
    references: [],
    uri: '',
    ...(applicationId && { applicationId }),
  }
  ReferencesStates.set(id, state, state)
}
