import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import { Text } from '@client_shared/components/Text'
import { makeCn } from '@client_shared/utils'
import { USER_ID } from '@client/projects/social/containers_v2/NavBar'
import { AlbumCardContainer } from './components/AlbumCardContainer/AlbumCardContainer'
import { PhotoCard } from './components'
import { PHOTO_ALBUMS } from './data/photoAlbums.data'
import { PHOTO } from './data/photos.data'
import { Switcher } from '../../components'
import styles from './Profile.module.scss'


const cn = makeCn('Profile', styles)

export enum PROFILE_LAYOUTS {
  WALL = 'wall',
  PHOTO = 'photo',
  VIDEO = 'video',
  WORK = 'work'
}

export enum GROUPS_SWITCH_VALUES {
  ALBUMS = 'albums',
  ALL = 'all',
}

const GROUPS_SWITCH = [
  {
    value: GROUPS_SWITCH_VALUES.ALBUMS,
    name: 'groupsSwitch',
    label: 'альбомы'
  },
  {
    value: GROUPS_SWITCH_VALUES.ALL,
    name: 'groupsSwitch',
    label: 'все'
  }
]

export const Profile: React.FC = React.memo(() => {
  const { query, replace } = useRouter()
  const checkWall = useCallback(() => replace({ query: { ...query, layout: PROFILE_LAYOUTS.WALL } }), [query])
  const checkVideo = useCallback(() => replace({ query: { ...query, layout: PROFILE_LAYOUTS.VIDEO } }), [query])
  const checkPhoto = useCallback(() => replace({ query: { ...query, layout: PROFILE_LAYOUTS.PHOTO } }), [query])
  const checkWork = useCallback(() => replace({ query: { ...query, layout: PROFILE_LAYOUTS.WORK } }), [query])

  /**
   * По умолчанию открыта стена
   */
  useEffect(() => {
    if (!query.layout) {
      checkWall()
    }
  }, [query])

  /**
   * Группировка (альбомная/все)
   */
  const [group, setGroup] = useState<GROUPS_SWITCH_VALUES>(GROUPS_SWITCH_VALUES.ALBUMS)
  const changeGroup = useCallback((v) => setGroup(v), [])

  const layoutTab = useMemo(() => {
    switch (query.layout as PROFILE_LAYOUTS) {
      case PROFILE_LAYOUTS.PHOTO:
        return (
          <>
            <div className={cn('FiltersContainer')}>
              <div className={cn('FiltersRow')}>Filter</div>
              <Switcher
                currentValue={group}
                onChange={changeGroup}
                options={GROUPS_SWITCH}
              />
            </div>
            {group === GROUPS_SWITCH_VALUES.ALBUMS && (
              <AlbumCardContainer
                albums={PHOTO_ALBUMS}
                photos={PHOTO}
                userId={USER_ID}
              />
            )}
            {group === GROUPS_SWITCH_VALUES.ALL && (
              <div className={cn('Photos')}>
                {
                  PHOTO.map((photo) => (<PhotoCard userId={USER_ID} key={photo.id} id={photo.id} {...photo} />))
                }
              </div>
            )}
          </>
        )
      case PROFILE_LAYOUTS.VIDEO:
        return <div>video</div>
      case PROFILE_LAYOUTS.WALL:
        return <div>wall</div>
      default:
        return null
    }
  }, [query, group])


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
        {layoutTab}
      </div>
    </div>
  )
})
