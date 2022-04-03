import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { makeCn } from '@client_shared/utils'
import { useScreenWidth } from '@client/shared/hooks'
import styles from './CommentsWrapper.module.scss'

const cn = makeCn('CommentsWrapper', styles)


const initial = { width: '0%' }

export type CommentsWrapperType = {
  isOpenComments: boolean
}

export const CommentsWrapper: React.FC<CommentsWrapperType> = React.memo(({ isOpenComments, children }) => {
const screenWidth = useScreenWidth()

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      {isOpenComments && (
        <motion.div
          className={cn()}
          animate={{ width: screenWidth <=768 ? '100%' : '50%' }}
          exit={initial}
          initial={initial}
          transition={{ duration: 1 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
})
