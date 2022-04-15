import React, { useCallback, useState } from 'react'
import { Switcher } from '@client/projects/social/components'
import { PhotoAlbumType } from '@client/projects/social/containers_v2/Profile/data/photoAlbums.data'
import { PhotoType } from '@client/projects/social/containers_v2/Profile/data/photos.data'
import { PhotoCard, AlbumCardContainer } from '@client/projects/social/containers_v2/Profile/components'
import { makeCn } from '@client_shared/utils'
import styles from './ProfileLayoutsPhoto.module.scss'


const cn = makeCn('PhotoProfileLayouts', styles)

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


type ProfileLayoutsPhotoType = {
  userId: number
  photos: PhotoType[]
  albums: PhotoAlbumType[]
}
export const ProfileLayoutsPhoto: React.FC<ProfileLayoutsPhotoType> = React.memo((props) => {
  const { photos, albums, userId } = props

  /**
   * Группировка (альбомная/все)
   */
  const [group, setGroup] = useState<GROUPS_SWITCH_VALUES>(GROUPS_SWITCH_VALUES.ALBUMS)
  const changeGroup = useCallback((v) => setGroup(v), [])

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
      {(() => {
        switch (group) {
          case GROUPS_SWITCH_VALUES.ALBUMS:
            return (
              <AlbumCardContainer
                albums={albums}
                photos={photos}
                userId={userId}
              />
            )
          case GROUPS_SWITCH_VALUES.ALL:
            return (
              <div className={cn('Photos')}>
                {photos.map((photo) => (
                  <PhotoCard
                    key={photo.id}
                    userId={userId}
                    id={photo.id}
                    {...photo}
                  />
                ))}
              </div>
            )
          default:
            return null
        }
      })()}
    </>
  )
})
