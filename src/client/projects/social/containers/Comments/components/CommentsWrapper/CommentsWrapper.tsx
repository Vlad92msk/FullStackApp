import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { makeCn } from '@client_shared/utils'
import styles from './CommentsWrapper.module.scss'

const cn = makeCn('CommentsWrapper', styles)


const initial = { width: '0%' }
const animate = { width: '50%' }

export type CommentsWrapperType = {
  isOpenComments: boolean
}

export const CommentsWrapper: React.FC<CommentsWrapperType> = React.memo(({ isOpenComments, children }) => {

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      {isOpenComments && (
        <motion.div
          className={cn()}
          animate={animate}
          exit={initial}
          initial={initial}
          transition={{ duration: 1.5 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
})
