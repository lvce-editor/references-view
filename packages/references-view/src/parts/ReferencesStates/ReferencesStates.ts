import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'

export const { get, set, wrapCommand, dispose, registerCommands, getCommandIds } = ViewletRegistry.create<ReferencesState>()
