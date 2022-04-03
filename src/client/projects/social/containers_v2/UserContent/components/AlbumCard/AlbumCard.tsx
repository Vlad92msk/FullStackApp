import React, { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import styles from './AlbumCard.module.scss'
import { Button } from '@client/shared/components/Button'
import { ButtonBox } from '@client/shared/components/ButtonBox'
import { Icon } from '@client/shared/components/Icon'
import { Image } from '@client/shared/components/Image'
import { useRouter } from 'next/router'

const cn = makeCn('AlbumCard', styles)


const initial = { opacity: 0, height: 0 }
const animate = { opacity: 1, height: 'auto' }
const transition = { duration: .5, ease: 'easeIn', delay: 1.5 }


export type MainCardType = {
  id: number
  title: string
  description?: string
  authorName?: string
  date: string
  likeCount?: number
  commentsCount?: number
}

export const AlbumCard: React.FC<MainCardType> = React.memo((props) => {
  const { id, title, date, authorName, description, commentsCount, likeCount } = props
  const { push, query: { lang, layout } } = useRouter()

  /**
   * Открыть фотоальбом
   */
  const handleMore = useCallback(() => {
    push({
      query: { lang, layout, albumId: id }
    })
  }, [layout, lang, id])

  return (
    <div className={cn()}>
      <Text className={cn('Date')} size={'2'} children={date} />
      <Text className={cn('Title')} children={title} />
      {description && (
        <Text className={cn('Description')} size={'1'} children={description} />
      )}
      <div className={cn('ButtonsRow')}>
        <ButtonBox className={cn('Button')} onClick={() => 1}>
          <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'heart-fill'} fill={'redRose40'} />
          <Text className={cn('ButtonText')} size={'2'} children={likeCount || 0} />
        </ButtonBox>
        <ButtonBox className={cn('Button')} onClick={() => 1}>
          <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'message-square'} fill={'bluePrimrose50'} />
          <Text className={cn('ButtonText')} size={'2'} children={commentsCount || 0} />
        </ButtonBox>
        <ButtonBox className={cn('Button')} onClick={handleMore}>
          <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'arrow-right'} fill={'bluePrimrose50'} />
          <Text className={cn('ButtonText')} size={'1'} children={'Открыть'} />
        </ButtonBox>
      </div>
      {authorName && (
        <div className={cn('AuthorRow')}>
          <div className={cn('AuthorImg')}>
            <Image sizePriority={'cover'} path={{
              img: 'ava',
              project: 'social'
            }} />
          </div>
          <Text className={cn('AuthorName')} children={authorName} size={'1'} />
        </div>
      )}
    </div>
  )
})
