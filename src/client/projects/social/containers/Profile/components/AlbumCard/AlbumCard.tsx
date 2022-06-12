import React, { useCallback, useEffect, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'

import { DigitalCard, DigitalCardType } from '../../../Profile/components'
import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { Button } from '@client_shared/components/Button'
import { ButtonBox } from '@client_shared/components/ButtonBox'
import { Icon } from '@client_shared/components/Icon'
import { Image } from '@client_shared/components/Image'
import { IconButton } from '@client_shared/components/IconButton'
import { PhotoType } from '../../data/photoItems.data'
import styles from './AlbumCard.module.scss'
import { dateType2 } from '@client/shared/utils/date'

const cn = makeCn('AlbumCard', styles)


export type MainCardType = {
  index: number
  id: number
  title: string
  description?: string
  authorName?: string
  date: Date
  likeCount?: number
  commentsCount?: number
  photo: PhotoType[]
  userId: number
}

export const AlbumCard: React.FC<MainCardType> = React.memo((props) => {
  const { id, title, date, authorName, description, commentsCount, likeCount, photo, userId, index } = props
  const [open, setOpen] = useState(false)

  /**
   * Открыть фотоальбом
   */
  const handleMore = useCallback(() => {
    if (!photo.length) return
    setOpen(prev => !prev)
  }, [open, photo])

  useEffect(() => {
    if (!photo?.length) {
      setOpen(false)
    }
  }, [photo])

  return (
    <Droppable droppableId={`album[${id}]`} key={`album[${id}]`}>
      {({ innerRef, droppableProps }, snapshot) => (
        <div
          {...droppableProps}
          ref={innerRef}
          className={cn({ active: open, dndActive: snapshot.isDraggingOver })}
        >
          {!open ? (
              <>
                <Text className={cn('Date')} size={'2'} children={dateType2(date)} />
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
                    <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'message-square'}
                          fill={'bluePrimrose50'} />
                    <Text className={cn('ButtonText')} size={'2'} children={commentsCount || 0} />
                  </ButtonBox>
                  <ButtonBox className={cn('Button')} data-pointer-disable={!photo.length} onClick={handleMore}>
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
              </>
            ) :
            (<>
              <div className={cn('GoBack')}>
                <Text className={cn('Title')} children={title} />
                <IconButton icon={'arrow-left'} onClick={handleMore} />
              </div>
              <div className={cn('Photos')}>
                {photo.map((photo, i) => (
                  <DigitalCard
                    key={photo.id}
                    index={i}
                    type={DigitalCardType.PHOTO}
                    item={photo}
                  />
                ))}
              </div>
            </>)
          }
        </div>
      )}
    </Droppable>
  )
})
