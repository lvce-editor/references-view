import type { DisplayReference } from '../DisplayReference/DisplayReference.ts'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { Reference } from '../Reference/Reference.ts'

export interface ReferencesState {
  readonly message: string
  readonly references: readonly Reference[]
  readonly displayReferences: readonly DisplayReference[]
  readonly id: number
  readonly focusedIndex: number
  readonly fileIconCache: FileIconCache
}
