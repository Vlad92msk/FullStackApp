import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { makeCn } from '@client_shared/utils'
import styles from './AnswerWrapper.module.scss'

const cn = makeCn('AnswerWrapper', styles)


const initial = { height: 0 }
const animate = { height: 'auto' }

export type AnswerWrapperType = {
  isOpenComments: boolean
}

export const AnswerWrapper: React.FC<AnswerWrapperType> = React.memo(({ isOpenComments, children }) => {

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      {isOpenComments && (
        <motion.div
          className={cn()}
          animate={animate}
          exit={initial}
          initial={initial}
          transition={{ duration: .7 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
})
