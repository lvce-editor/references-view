export interface ViewletAction {
  readonly badgeText?: string
  readonly command: string
  readonly disabled?: boolean
  readonly icon?: string
  readonly id: string
  readonly placeholder?: string
  readonly type: number
  readonly value?: string
}
