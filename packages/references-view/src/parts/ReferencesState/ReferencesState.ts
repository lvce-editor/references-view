import type { DisplayReference } from '../DisplayReference/DisplayReference.ts'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { Reference } from '../Reference/Reference.ts'

export interface ReferencesState {
  readonly collapsedUris: readonly string[]
  readonly displayReferences: readonly DisplayReference[]
  readonly fileIconCache: FileIconCache
  readonly focusedIndex: number
  readonly id: number
  readonly languageId: string
  readonly message: string
  readonly offset: number
  readonly references: readonly Reference[]
  readonly uri: string
  readonly assetDir: string
  readonly platform: number
}
