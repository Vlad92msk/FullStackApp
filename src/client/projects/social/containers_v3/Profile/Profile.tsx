import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Text } from '@client_shared/components/Text'
import { makeCn } from '@client_shared/utils'
import { useReplaceRouterQuery } from '@client_shared/hooks'
import { ProfileLayoutAboutMe, ProfileLayoutDigital, ProfileLayoutWall } from './components'
import { USER } from './../App/data/user'
import { USER_ID } from './../NavBar'
import { PHOTO_ALBUMS } from './data/photoAlbums.data'
import { PHOTO_ITEMS } from './data/photoItems.data'
import { VIDEO_ITEMS } from './data/videoItems.data'
import { VIDEO_ALBUMS } from './data/videoAlbums.data'
import styles from './Profile.module.scss'


const cn = makeCn('Profile', styles)

export enum PROFILE_LAYOUTS {
  WALL = 'wall',
  PHOTO = 'photo',
  VIDEO = 'video',
  WORK = 'work',
  ABOUT_ME = 'about_me'
}

export const Profile: React.FC = React.memo(() => {
  const {
    friends: userFriends
  } = USER
  const { query } = useRouter()

  const checkWall = useReplaceRouterQuery({ layout: PROFILE_LAYOUTS.WALL })
  const checkVideo = useReplaceRouterQuery({ layout: PROFILE_LAYOUTS.VIDEO })
  const checkPhoto = useReplaceRouterQuery({ layout: PROFILE_LAYOUTS.PHOTO })
  const checkWork = useReplaceRouterQuery({ layout: PROFILE_LAYOUTS.WORK })
  const checkAboutMe = useReplaceRouterQuery({ layout: PROFILE_LAYOUTS.ABOUT_ME })


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
          data-active={query.layout === PROFILE_LAYOUTS.ABOUT_ME}
          onClick={checkAboutMe}
          children={'Обо мне'}
        />
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
            case PROFILE_LAYOUTS.ABOUT_ME:
              return (
                <ProfileLayoutAboutMe
                  userInfo={USER}
                />
              )
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
