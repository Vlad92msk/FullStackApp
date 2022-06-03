import React, { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { makeCn } from '@client_shared/utils'
import { useScreenWidth } from '@client/shared/hooks'
import styles from './AnimateOpenComments.module.scss'

const cn = makeCn('AnimateOpenComments', styles)

export type CommentsOpenType = 'horizontal' | 'vertical'

export type AnimateOpenCommentsType = {
  isOpenComments: boolean
  width?: string
  openType: CommentsOpenType
}

export const AnimateOpenComments: React.FC<AnimateOpenCommentsType> = (props) => {
  const { isOpenComments, width, openType, children } = props
  const screenWidth = useScreenWidth()
  const componentWidth = width ? width : screenWidth <= 768 ? '100%' : '50%'

  const animateOptions = useMemo(() => {
    switch (openType) {
      case 'horizontal':
        return ({
          animate: { width: componentWidth },
          exit: { width: '0%' },
          initial: { width: '0%' },
        });
      case 'vertical':
        return ({
          style: {width: '100%'},
          animate: { height: 'auto' },
          exit: { height: '0%' },
          initial: { height: '0%' },
        });
      default: return null
    }
  }, [openType, componentWidth])

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      {isOpenComments && (
        <motion.div
          className={cn()}
          transition={{ duration: 1 }}
          {...animateOptions}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
