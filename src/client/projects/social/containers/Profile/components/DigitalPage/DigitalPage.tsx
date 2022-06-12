import React, { useState } from 'react'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { Button } from '@client_shared/components/Button'
import { ButtonBox } from '@client_shared/components/ButtonBox'
import { Icon } from '@client_shared/components/Icon'
import { Image } from '@client_shared/components/Image'
import { UserSmall } from '@client/projects/social/components'
import { ServiceComments } from '@client/projects/social/containers/Comments/service'
import { PhotoType } from '../../data/photoItems.data'
import { dateType1, dateType2 } from '@client/shared/utils/date'
import { useRouter } from 'next/router'
import styles from './DigitalPage.module.scss'
import { useToggle } from '@client/shared/hooks'

const cn = makeCn('DigitalPage', styles)


export interface DigitalPageType {
  userId: number
  data: PhotoType
}

/**
 * Карточка для ФОТО/ВИДЕО
 */
export const DigitalPage: React.FC<DigitalPageType> = React.memo((props) => {
  const { userId, data } = props
  const {
    id,
    commentsCount,
    likeCount,
    date,
    description,
    disLikeCounts,
    authorName,
    title,
    authorId
  } = data
  const { back } = useRouter()
  const [isOpenComments, setOpenComments] = useToggle(false)

  return (
    <div className={cn()}>
      <Button
        className={cn('Back')}
        styleType={'rounded'}
        color={'blue'}
        icon={'arrow-left-sharp'}
        onClick={back}
      >
        Вернуться
      </Button>

      <div className={cn('Main')}>
        <div className={cn('Box')}>
          <div className={cn('Photo')}>
            <Image path={{ img: 'ava', project: 'social' }} sizePriority={'contain'} />
          </div>
          <div className={cn('TitleRow')}>
            <ButtonBox className={cn('Button')}>
              <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'eye-off'} fill={'oldAsphalt50'} />
              <Text className={cn('ButtonText')} size={'2'} children={'45'} />
            </ButtonBox>
            {/*<Text className={cn('Date')} size={'2'} children={dateType2(date)} />*/}
          </div>

          <div className={cn('ButtonsGroup')}>
            <div className={cn('Button')}>
              <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'heart'} fill={'redRose40'} />
              <Text className={cn('ButtonText')} size={'2'} children={likeCount || 0} />
            </div>
            <div className={cn('Button')}>
              <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'dislike'} fill={'bluePrimrose50'} />
              <Text className={cn('ButtonText')} size={'2'} children={disLikeCounts || 0} />
            </div>
            <div className={cn('Button')} onClick={setOpenComments}>
              <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'message-square'}
                    fill={'bluePrimrose50'} />
              <Text className={cn('ButtonText')} size={'2'} children={commentsCount || 0} />
            </div>
            <div className={cn('Button')}>
              <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'hash'} fill={'oldAsphalt40'} />
              <Text className={cn('ButtonText')} size={'2'} children={commentsCount || 0} />
            </div>
          </div>
        </div>
        {((userId !== authorId) && authorName) && (
          <div className={cn('AuthorBox')}>
            <UserSmall userName={authorName} img={'ava'} />

            <Text
              className={cn('Subscribe')}
              size={'1'}
              onClick={() => console.log('subscribe')}
              children={'Подписаться'} />

          </div>
        )}
        <Text className={cn('Title')} children={title} />
        <Text className={cn('Description')} children={description} />
      </div>
      <ServiceComments
        serviceName={'DigitalPage'}
        provideProps={{
          isOpenComments,
          id
        }}
      />
    </div>
  )
})
