import { SpeedDailDirection } from './speedDailDirection'
import { SpeedDailElement } from './speedDailElement'

export type SpeedDailType = {
  direction?: SpeedDailDirection
  elements: SpeedDailElement[]
  gap?: number
}
