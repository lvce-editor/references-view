import { terminate } from '@lvce-editor/viewlet-registry'
import * as Create from '../Create/Create.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import * as Dispose from '../Dispose/Dispose.ts'
import * as FocusFirst from '../FocusFirst/FocusFirst.ts'
import * as FocusIndex from '../FocusIndex/FocusIndex.ts'
import * as FocusLast from '../FocusLast/FocusLast.ts'
import * as FocusNext from '../FocusNext/FocusNext.ts'
import * as FocusPrevious from '../FocusPrevious/FocusPrevious.ts'
import * as GetCommandIds from '../GetCommandIds/GetCommandIds.ts'
import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import * as HandleClickReference from '../HandleClickReference/HandleClickReference.ts'
import * as Initialize from '../Initialize/Initialize.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as WrapCommand from '../ReferencesStates/ReferencesStates.ts'
import { refresh } from '../Refresh/Refresh.ts'
import * as Render2 from '../Render2/Render2.ts'
import * as RenderActions from '../RenderActions/RenderActions.ts'
import * as RenderEventListeners from '../RenderEventListeners/RenderEventListeners.ts'
import * as RestoreState from '../RestoreState/RestoreState.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import * as SelectIndex from '../SelectIndex/SelectIndex.ts'

export const commandMap = {
  'References.create': Create.create,
  'References.diff2': Diff2.diff2,
  'References.refresh': WrapCommand.wrapCommand(refresh),
  'References.dispose': Dispose.dispose,
  'References.focusFirst': WrapCommand.wrapCommand(FocusFirst.focusFirst),
  'References.focusIndex': WrapCommand.wrapCommand(FocusIndex.focusIndex),
  'References.focusLast': WrapCommand.wrapCommand(FocusLast.focusLast),
  'References.focusNext': WrapCommand.wrapCommand(FocusNext.focusNext),
  'References.focusPrevious': WrapCommand.wrapCommand(FocusPrevious.focusPrevious),
  'References.getCommandIds': GetCommandIds.getCommandIds,
  'References.getKeyBindings': GetKeyBindings.getKeyBindings,
  'References.handleClickReference': WrapCommand.wrapCommand(HandleClickReference.handleClickReference),
  'References.initialize': Initialize.initialize,
  'References.loadContent': WrapCommand.wrapCommand(LoadContent.loadContent),
  'References.render2': Render2.render2,
  'References.renderActions': RenderActions.renderActions,
  'References.renderEventListeners': RenderEventListeners.renderEventListeners,
  'References.restoreState': RestoreState.restoreState,
  'References.saveState': SaveState.saveState,
  'References.selectIndex': WrapCommand.wrapCommand(SelectIndex.selectIndex),
  'References.terminate': terminate,
}
