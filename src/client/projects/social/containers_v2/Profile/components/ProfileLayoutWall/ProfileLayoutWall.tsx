import React, { useCallback, useState } from 'react'
import { makeCn } from '@client_shared/utils'
import { UserSmall } from '@client/projects/social/components'
import { Text } from '@client/shared/components/Text'
import { Comments } from '@client/projects/social/containers_v2/Comments'
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
          <Text className={cn('RecordText')} children={'dwedwed'} />
          <Comments width={'100%'} commentsHeight={'40vh'} isOpenComments={true} />
        </div>
      </div>
    </div>
  )
})
