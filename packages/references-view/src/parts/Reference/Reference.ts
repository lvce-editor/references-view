export interface Reference {
  readonly uri: string
  readonly lineText?: string
  readonly startColumnIndex?: number
  readonly endColumnIndex?: number
  readonly startOffset?: number
  readonly endOffset?: number
}