import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Text } from '@client_shared/components/Text'
import { makeCn } from '@client_shared/utils'
import { useReplaceRouterQuery } from '@client_shared/hooks'
import { ProfileLayoutDigital, ProfileLayoutWall } from './components'
import { USER_ID } from '@client/projects/social/containers_v2/NavBar'
import { PHOTO_ALBUMS } from '@client/projects/social/containers_v2/Profile/data/photoAlbums.data'
import { PHOTO_ITEMS } from '@client/projects/social/containers_v2/Profile/data/photoItems.data'
import { VIDEO_ITEMS } from '@client/projects/social/containers_v2/Profile/data/videoItems.data'
import { VIDEO_ALBUMS } from '@client/projects/social/containers_v2/Profile/data/videoAlbums.data'
import { USER } from '@client/projects/social/containers_v2/App/data/user'
import styles from './Profile.module.scss'


const cn = makeCn('Profile', styles)

export enum PROFILE_LAYOUTS {
  WALL = 'wall',
  PHOTO = 'photo',
  VIDEO = 'video',
  WORK = 'work'
}

export const Profile: React.FC = React.memo(() => {
  const {
    friends: userFriends,
  } = USER
  const { query } = useRouter()

  const checkWall = useReplaceRouterQuery({ layout: PROFILE_LAYOUTS.WALL })
  const checkVideo = useReplaceRouterQuery({ layout: PROFILE_LAYOUTS.VIDEO })
  const checkPhoto = useReplaceRouterQuery({ layout: PROFILE_LAYOUTS.PHOTO })
  const checkWork = useReplaceRouterQuery({ layout: PROFILE_LAYOUTS.WORK })


  /**
   * По умолчанию открыта стена
   */
  useEffect(() => {
    if (!query.layout) {
      checkWall()
    }
  }, [query])


  return (
    <div className={cn()}>
      <div className={cn('TabButtons')}>
        <Text
          size={'4'}
          textTransform={'uppercase'}
          data-active={query.layout === PROFILE_LAYOUTS.WALL}
          onClick={checkWall}
          children={'Стена'}
        />
        <Text
          size={'4'}
          textTransform={'uppercase'}
          data-active={query.layout === PROFILE_LAYOUTS.PHOTO}
          onClick={checkPhoto}
          children={'Фото'}
        />
        <Text
          size={'4'} textTransform={'uppercase'}
          data-active={query.layout === PROFILE_LAYOUTS.VIDEO}
          onClick={checkVideo}
          children={'Видео'}
        />
        <Text
          size={'4'}
          textTransform={'uppercase'}
          data-active={query.layout === PROFILE_LAYOUTS.WORK}
          onClick={checkWork}
          children={'Работа'}
        />
      </div>
      <div className={cn('Container')}>
        {(() => {
          switch (query.layout as PROFILE_LAYOUTS) {
            case PROFILE_LAYOUTS.PHOTO:
              return (
                <ProfileLayoutDigital
                  allItems={PHOTO_ITEMS}
                  userId={USER_ID}
                  albums={PHOTO_ALBUMS}
                />
              )
            case PROFILE_LAYOUTS.VIDEO:
              return (
                <ProfileLayoutDigital
                  allItems={VIDEO_ITEMS}
                  userId={USER_ID}
                  albums={VIDEO_ALBUMS}
                />
              )
            case PROFILE_LAYOUTS.WALL:
              return <ProfileLayoutWall userId={USER_ID} />
            default:
              return null
          }
        })()}
      </div>
    </div>
  )
})
