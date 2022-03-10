import { SpeedDailDirection } from '../types/speedDailDirection'
import { SpeedDailVariants } from '../types/speedDailVariants'

export const speedDailVariants = {
  visible: ({ custom, direction, gap }: SpeedDailVariants) => {
    switch (direction) {
      case SpeedDailDirection.LEFT:
        return ({
          opacity: 1,
          transform: `translateX(-${custom * gap}px)`,
          transition: { delay: custom * .3, duration: .5 }
        })
      case SpeedDailDirection.RIGHT:
        return ({
          opacity: 1,
          transform: `translateX(${custom * gap}px)`,
          transition: { delay: custom * .3, duration: .5 }
        })
      case SpeedDailDirection.TOP:
        return ({
          opacity: 1,
          transform: `translateY(-${custom * gap}px)`,
          transition: { delay: custom * .3, duration: .5 }
        })
      case SpeedDailDirection.BOTTOM:
        return ({
          opacity: 1,
          transform: `translateY(${custom * gap}px)`,
          transition: { delay: custom * .3, duration: .5 }
        })
      default:
        return null
    }
  },
  hide: ({ custom }) => {
    return ({
      opacity: 0,
      transform: `translateX(0px)`,
      transition: { delay: custom * .3, duration: .5 }
    })
  }
}
