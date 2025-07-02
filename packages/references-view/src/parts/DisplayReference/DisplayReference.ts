export interface DisplayReference {
  readonly depth: number
  readonly posInSet: number
  readonly setSize: number
  readonly type: number
  readonly uri: string
  readonly name: string
  readonly lineText: string
  readonly icon: string
  readonly index: number
  readonly startOffset: number | undefined
  readonly endOffset: number | undefined
}
