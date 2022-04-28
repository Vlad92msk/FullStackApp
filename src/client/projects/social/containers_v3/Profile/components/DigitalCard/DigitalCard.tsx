import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Draggable } from 'react-beautiful-dnd'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { Button } from '@client_shared/components/Button'
import { ButtonBox } from '@client_shared/components/ButtonBox'
import { Icon } from '@client_shared/components/Icon'
import { MImage } from '@client_shared/components/Image'
import { useToggle } from '@client_shared/hooks'
import { UserSmall } from '@client/projects/social/components'
import { Comments } from '../../../Comments'
import { PhotoType } from '../../data/photoItems.data'
import { initialEl, useMainAnim } from './functions/main.animate'
import styles from './DigitalCard.module.scss'

const cn = makeCn('DigitalCard', styles)


export interface PhotoCardType {
  userId: number
  item: PhotoType
  index: number
}

/**
 * Карточка для ФОТО/ВИДЕО
 */
export const DigitalCard: React.FC<PhotoCardType> = React.memo((props) => {
  const { userId, index, item } = props
  const {
    id,
    commentsCount,
    likeCount,
    date,
    commentUsersIds,
    description,
    disLikeCounts,
    disLikeUsersIds,
    hash,
    likeUsersIds,
    authorName,
    title,
    authorId
  } = item

  const [isHover, setHover] = useState(false)
  const [open, toggleCard] = useToggle(null)
  const [isOpenComments, setOpenComments] = useState(null)
  const ref = useRef<HTMLDivElement>(null)
  const main = useMainAnim(open, ref)


  /**
   * Автоматически закрыть комментарии если закрывается сама модалка
   */
  useEffect(() => {
    if (!open) {
      setOpenComments(false)
    }
  }, [open])

  /**
   * Открыть фотоальбом
   */
  useEffect(() => {
    if (open === null) {
      return
    }
  }, [open])


  return (
    <Draggable draggableId={`item[${id}]`} index={index}>
      {({
          draggableProps,
          dragHandleProps,
          innerRef
        }, snapshot) => (
        <div
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}
        >
          <motion.div
            ref={ref}
            className={cn()}
            animate={main}
          >
            <div
              className={cn('Column')}
              style={{
                width: '100%',
                background: open ? '#2b3041' : null,
                padding: open ? '24px' : null
              }}
            >
              <div className={cn('Row')} style={{
                height: open ? '100%' : null,
                flexDirection: open ? 'column' : 'row'
              }}>
                <div
                  className={cn('Photo')}
                  style={{ height: open ? '100%' : null }}
                  onMouseEnter={() => !open && setHover(true)}
                  onMouseLeave={() => !open && setHover(false)}
                  onClick={toggleCard}
                >
                  <MImage
                    initial={open ? { objectFit: 'contain' } : { objectFit: 'cover' }}
                    animate={open ? { objectFit: 'contain' } : {
                      objectFit: 'cover',
                      transition: { delay: 2 }
                    }}
                    exit={{ objectFit: 'cover', transition: { delay: 2 } }}
                    path={{ img: 'ava', project: 'social' }}
                  />
                </div>
                <AnimatePresence exitBeforeEnter initial={false}>
                  <motion.div
                    className={cn('TitleRow')}
                    data-hover={isHover}
                    data-open={open}
                  >
                    <ButtonBox className={cn('Button')} onClick={() => 1}>
                      <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'eye-off'} fill={'oldAsphalt50'} />
                      <Text className={cn('ButtonText')} size={'2'} children={'45'} />
                    </ButtonBox>
                    <Text className={cn('Date')} size={'2'} children={date} />
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence exitBeforeEnter initial={false}>
                  <motion.div
                    className={cn('ButtonsGroup')}
                    data-hover={isHover}
                    data-open={open}
                  >
                    <div className={cn('Button')}>
                      <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'heart'} fill={'redRose40'} />
                      <Text className={cn('ButtonText')} size={'2'} children={likeCount || 0} />
                    </div>
                    <div className={cn('Button')}>
                      <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'dislike'} fill={'bluePrimrose50'} />
                      <Text className={cn('ButtonText')} size={'2'} children={disLikeCounts || 0} />
                    </div>
                    <div className={cn('Button')} onClick={() => setOpenComments(prev => !prev)}>
                      <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'message-square'}
                            fill={'bluePrimrose50'} />
                      <Text className={cn('ButtonText')} size={'2'} children={commentsCount || 0} />
                    </div>
                    <div className={cn('Button')}>
                      <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'hash'} fill={'oldAsphalt40'} />
                      <Text className={cn('ButtonText')} size={'2'} children={commentsCount || 0} />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              {((userId !== authorId) && authorName) && (
                <div className={cn('AuthorBox')}>
                  <UserSmall userName={authorName} img={'ava'} />
                  {open && (
                    <Text
                      className={cn('Subscribe')}
                      size={'1'}
                      onClick={() => console.log('subscribe')}
                      children={'Подписаться'} />
                  )}
                </div>
              )}
              {open && (
                <>
                  <Text className={cn('Title')} children={title} />
                  <Text className={cn('Description')} children={description} />
                </>
              )}
            </div>
            <Comments isOpenComments={isOpenComments} />
          </motion.div>
        </div>
      )}
    </Draggable>
  )
})
