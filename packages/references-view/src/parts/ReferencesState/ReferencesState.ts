import type { DisplayReference } from '../DisplayReference/DisplayReference.ts'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { Reference } from '../Reference/Reference.ts'

export interface ReferencesState {
  readonly assetDir: string
  readonly collapsedUris: readonly string[]
  readonly displayReferences: readonly DisplayReference[]
  readonly fileIconCache: FileIconCache
  readonly focusedIndex: number
  readonly id: number
  readonly languageId: string
  readonly message: string
  readonly offset: number
  readonly platform: number
  readonly references: readonly Reference[]
  readonly uri: string
}
