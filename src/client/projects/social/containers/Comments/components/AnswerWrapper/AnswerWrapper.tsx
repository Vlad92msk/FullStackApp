import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { makeCn } from '@client_shared/utils'
import { useServiceCommentsSelector } from '../../service'
import styles from './AnswerWrapper.module.scss'

const cn = makeCn('AnswerWrapper', styles)


const initial = { height: 0 }
const animate = { height: 'auto' }

export type AnswerWrapperType = {
  commentId: string
}

export const AnswerWrapper: React.FC<AnswerWrapperType> = (props) => {
  const { commentId, children } = props
  const openCommentId = useServiceCommentsSelector('openCommentId')

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      {commentId === openCommentId && (
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
}
