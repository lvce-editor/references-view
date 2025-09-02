import type { DisplayReference } from '../DisplayReference/DisplayReference.ts'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { Reference } from '../Reference/Reference.ts'

export interface ReferencesState {
  readonly displayReferences: readonly DisplayReference[]
  readonly fileIconCache: FileIconCache
  readonly focusedIndex: number
  readonly id: number
  readonly message: string
  readonly references: readonly Reference[]
  readonly offset: number
  readonly uri: string
  readonly languageId: string
  readonly collapsedUris: readonly string[]
}
