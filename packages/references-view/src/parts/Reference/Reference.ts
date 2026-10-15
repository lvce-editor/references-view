export interface Reference {
  readonly endColumnIndex?: number
  readonly endOffset?: number
  readonly endRowIndex?: number
  readonly lineText?: string
  readonly startColumnIndex?: number
  readonly startOffset?: number
  readonly startRowIndex?: number
  readonly uri: string
}
