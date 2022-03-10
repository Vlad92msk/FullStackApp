import React, { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { makeCn } from '@client_shared/utils'
import { speedDailVariants } from './data/speedDailVariants'
import { SpeedDailType } from './types/speedDail'
import { SpeedDailDirection } from './types/speedDailDirection'

import styles from './SpeedDial.module.scss'
import { IconButton } from '@client/shared/components/IconButton'
export const cn = makeCn('SpeedDail', styles)


export const SpeedDail: React.FC<SpeedDailType> = ({ direction, elements, gap }) => {
  const [open, handleOpen] = useState(false)

  const handleChangeSocial = useCallback(() => {
    handleOpen(prev => !prev)
  }, [])

  return (
    <div className={cn('SpeedDailRow', { type: direction })}>
      <IconButton icon={'share'} fill={'bluePrimrose50'} onClick={handleChangeSocial} />
      <AnimatePresence>
        {open && elements.filter(Boolean).map(({ element, id }, i) => (
          <motion.span
            className={cn('SpeedDailItem')}
            key={id}
            variants={speedDailVariants}
            custom={{ custom: i + 1, direction, gap }}
            initial={'hide'}
            animate={'visible'}
            exit={'hide'}
          >
            {element}
          </motion.span>
        ))
        }
      </AnimatePresence>
    </div>
  )
}

SpeedDail.defaultProps = {
  direction: SpeedDailDirection.LEFT,
  gap: 40,
}
