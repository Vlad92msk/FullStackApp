import React, { useState } from 'react'
import { format } from 'date-fns'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper/core'

import { UserSmall } from '@client_projects/social/components'
import { Text } from '@client_shared/components/Text'
import { Image } from '@client_shared/components/Image'
import { makeCn } from '@client_shared/utils'
import { Icon } from '@client_shared/components/Icon'
import { Comments } from '@client/projects/social/containers_v2/Comments'
import { WallRecordItemType } from '@client/projects/social/containers_v2/Profile/data/walls.data'
import styles from './WallRecord.module.scss'

SwiperCore.use([Pagination])

const cn = makeCn('WallRecord', styles)

type WallRecordType = {
  record: WallRecordItemType
}
export const WallRecord: React.FC<WallRecordType> = React.memo((props) => {
  const {
    record: {
      userAva,
      userName,
      dateCreated,
      recordImg,
      recordText,
      recordVideo,
      id,
      comments,
      commentsCount,
      dislikeCounts,
      likesCount,
      attachments
    }
  } = props

  const [isOpenComments, setOpenComments] = useState(null)


  return (
    <div className={cn()}>
      <div className={cn('Header')}>
        <UserSmall
          className={cn('User')}
          avaClassName={cn('UserAva')}
          textClassName={cn('UserName')}
          textSize={'3'}
          userName={userName}
          img={userAva}
        />
        <Text className={cn('Date')} size={'2'} children={format(dateCreated, 'dd.MM.yyyy в HH:mm')} />
      </div>
      <div className={cn('Body')}>
        <div className={cn('Content')}>
          <div style={{
            display: 'grid'
          }}>
            {attachments?.length && (
              <Swiper
                className={cn('Slider')}
                pagination={{ dynamicBullets: true }}
              >
                {attachments.map(({ name, src }) => (
                  <SwiperSlide
                    className={cn('Slide')}
                    key={name}
                    id={name}
                  >
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%'
                    }}>
                      <img style={{
                        position: 'absolute',
                        objectFit: 'contain',
                        width: '100%',
                        height: '100%'
                      }} src={src} alt={name} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
          <Text className={cn('RecordText')} children={recordText} />
          <div className={cn('ButtonsGroup')}>
            <div className={cn('Button')} onClick={() => setOpenComments(prev => !prev)}>
              <Icon
                className={cn('ButtonIcon')}
                size={'ordinary'}
                icon={'message-square'}
                fill={'bluePrimrose50'}
              />
              <Text
                className={cn('ButtonText')}
                size={'2'}
                children={commentsCount || 0}
              />
            </div>
            <div style={{ display: 'flex' }}>
              <div className={cn('Button')}>
                <Icon
                  className={cn('ButtonIcon')}
                  size={'ordinary'}
                  icon={'heart'}
                  fill={'redRose40'}
                />
                <Text className={cn('ButtonText')} size={'2'} children={likesCount || 0} />
              </div>
              <div className={cn('Button')}>
                <Icon
                  className={cn('ButtonIcon')}
                  size={'ordinary'}
                  icon={'dislike'}
                  fill={'bluePrimrose50'}
                />
                <Text className={cn('ButtonText')} size={'2'} children={dislikeCounts || 0} />
              </div>
            </div>
          </div>
        </div>
        <Comments
          width={'100%'}
          commentsHeight={'40vh'}
          isOpenComments={isOpenComments}
          openType={'vertical'}
        />
      </div>
    </div>
  )
})
