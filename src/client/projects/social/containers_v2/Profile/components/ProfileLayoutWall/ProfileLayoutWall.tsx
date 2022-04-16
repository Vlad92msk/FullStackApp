import React, { useCallback, useState } from 'react'
import { makeCn } from '@client_shared/utils'
import { UserSmall } from '@client/projects/social/components'
import { Text } from '@client/shared/components/Text'
import { Comments } from '@client/projects/social/containers_v2/Comments'
import { Image } from '@client/shared/components/Image'
import { Icon } from '@client/shared/components/Icon'
import styles from './ProfileLayoutWall.module.scss'


const cn = makeCn('ProfileLayoutWall', styles)

type ProfileLayoutWallType = {
  userId: number
}

/**
 * Раздел Профиля - Контент-компонет для Видео или Фото
 */
export const ProfileLayoutWall: React.FC<ProfileLayoutWallType> = React.memo((props) => {
  const { userId } = props

  const [isOpenComments, setOpenComments] = useState(null)
  return (
    <div className={cn()}>
      <div className={cn('Record')}>
        <div className={cn('Header')}>
          <UserSmall
            className={cn('User')}
            avaClassName={cn('UserAva')}
            textClassName={cn('UserName')}
            textSize={'3'}
            userName={'dwedw'}
            img={'ava'}
          />
          <Text className={cn('Date')} size={'2'} children={'01/21/2002'} />
        </div>
        <div className={cn('Body')}>
          <div className={cn('Content')}>
            <div className={cn('RecordAttach')}>
              <Image className={cn('RecordAttachItem')} path={{ img: 'ava', project: 'social' }} sizePriority={'contain'} />
            </div>
            <Text className={cn('RecordText')} children={'dwedwed'} />
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
                  children={234}
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
                  <Text className={cn('ButtonText')} size={'2'} children={1} />
                </div>
                <div className={cn('Button')}>
                  <Icon
                    className={cn('ButtonIcon')}
                    size={'ordinary'}
                    icon={'dislike'}
                    fill={'bluePrimrose50'}
                  />
                  <Text className={cn('ButtonText')} size={'2'} children={23} />
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
    </div>
  )
})
