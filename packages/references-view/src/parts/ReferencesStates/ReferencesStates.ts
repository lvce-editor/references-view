import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'

export const { dispose, get, getCommandIds, registerCommands, set, wrapCommand } = ViewletRegistry.create<ReferencesState>()
