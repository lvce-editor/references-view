import type { ReferencesState } from '../ReferencesState/ReferencesState.ts'
import type { Renderer } from '../Renderer/Renderer.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import { renderIncremental } from '../RenderIncremental/RenderIncremental.ts'
import * as RenderItems from '../RenderItems/RenderItems.ts'

export const getRenderer = (diffType: number): Renderer<ReferencesState> => {
  switch (diffType) {
    case DiffType.RenderItems:
      return RenderItems.renderItems
    case DiffType.RenderIncremental:
      return renderIncremental
    default:
      throw new Error('unknown renderer')
  }
}
