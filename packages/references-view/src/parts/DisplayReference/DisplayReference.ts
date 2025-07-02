import * as LocationType from '../LocationType/LocationType.ts'

export interface DisplayReference {
  readonly depth: 1 | 2
  readonly posInSet: number
  readonly setSize: number
  readonly type: typeof LocationType.Leaf | typeof LocationType.Expanded | typeof LocationType.Collapsed
  readonly uri: string
  readonly name: string
  readonly lineText: string
  readonly icon: string
  readonly index: number
  readonly startOffset: number | undefined
  readonly endOffset: number | undefined
}