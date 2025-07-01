import * as Create from '../Create/Create.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import * as Dispose from '../Dispose/Dispose.ts'
import * as GetCommandIds from '../GetCommandIds/GetCommandIds.ts'
import * as Initialize from '../Initialize/Initialize.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as WrapCommand from '../ReferencesStates/ReferencesStates.ts'
import * as Render2 from '../Render2/Render2.ts'
import * as Terminate from '../Terminate/Terminate.ts'

export const commandMap = {
  'References.create': Create.create,
  'References.diff2': Diff2.diff2,
  'References.dispose': Dispose.dispose,
  'References.getCommandIds': GetCommandIds.getCommandIds,
  'References.loadContent': WrapCommand.wrapCommand(LoadContent.loadContent),
  'References.render2': Render2.render2,
  'References.terminate': Terminate.terminate,
  'References.initialize': Initialize.initialize,
}
