import type { IViewletCommand } from '../ViewletCommand/ViewletCommand.ts'

export interface Renderer<T> {
  (oldState: T, newState: T): IViewletCommand
}
