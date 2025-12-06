export interface Reference {
  readonly endColumnIndex?: number
  readonly endOffset?: number
  readonly lineText?: string
  readonly startColumnIndex?: number
  readonly startOffset?: number
  readonly uri: string
}
