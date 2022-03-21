import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import { makeCn } from '@client_shared/utils'
import { ButtonBox } from '@client_shared/components/ButtonBox'
import { Text } from '@client_shared/components/Text'
import styles from './ProfileCard.module.scss'
import { IconButton } from '@client/shared/components/IconButton'

const cn = makeCn('ProfileCard', styles)


const initial = { opacity: 0, height: 0 }
const animate = { opacity: 1, height: 'auto' }
const transition = { duration: .5, ease: 'easeIn', delay: 1.5 }


export type CardType = {
  name: string
  title: string
}

export const ProfileCard: React.FC<CardType> = React.memo(({ name, title, children }) => {
  const { push, query: { lang, layout } } = useRouter()
  const [isActive, setActive] = useState(false)

  useEffect(() => {
    if (layout === name) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [layout])

  /**
   * Открыть карточку
   */
  const handleOpenCard = useCallback(() => {
    push({
      query: { lang, layout: name }
    })
  }, [lang])

  /**
   * Закрыть карточку
   */
  const handleCloseCard = useCallback(() => {
    push({
      query: { lang }
    })
  }, [lang])

  return (
    <div className={cn({ active: isActive })}>
      <ButtonBox
        className={cn('Button', { active: isActive })}
        onClick={isActive ? handleCloseCard : handleOpenCard}
      >
        <Text
          className={cn('Title')}
          size={'5'}
          textTransform={'uppercase'}
          children={title}
        />
      </ButtonBox>
      {isActive && (
        <motion.div
          className={cn('ContentContainer')}
          initial={initial}
          animate={animate}
          exit={initial}
          transition={transition}
        >
          {children}
          <div className={cn('Add')}>
            <IconButton onClick={() => 1} icon={'plus'} fill={'oldAsphalt40'} size={'large'} />
          </div>
        </motion.div>
      )}
      {isActive && <motion.span
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ delay: 1.5 }} className={cn('Gap')}
      />}
    </div>
  )
})
