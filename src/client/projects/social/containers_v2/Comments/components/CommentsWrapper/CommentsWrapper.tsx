import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { makeCn } from '@client_shared/utils'
import { useScreenWidth } from '@client/shared/hooks'
import styles from './CommentsWrapper.module.scss'

const cn = makeCn('CommentsWrapper', styles)


const initial = { width: '0%' }

export type CommentsWrapperType = {
  isOpenComments: boolean
  width?: string
}

export const CommentsWrapper: React.FC<CommentsWrapperType> = React.memo((props) => {
  const { isOpenComments, width, children } = props
  const screenWidth = useScreenWidth()
  const componentWidth = width ? width : screenWidth <= 768 ? '100%' : '50%'

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      {isOpenComments && (
        <motion.div
          className={cn()}
          animate={{ width: componentWidth }}
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
