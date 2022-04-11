import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { USER_ID } from '@client/projects/social/containers_v2/NavBar'
import { AlbumCardContainer } from './components/AlbumCardContainer/AlbumCardContainer'
import { PhotoCard } from './components'
import { PHOTO_ALBUMS } from './data/photoAlbums.data'
import { PHOTO } from './data/photos.data'
import { Switcher } from '../../components'
import styles from './UserContent.module.scss'


const cn = makeCn('UserContent', styles)

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

export const UserContent: React.FC = React.memo(() => {
  const { push, query: { lang, user_id, layout } } = useRouter()

  const dwed = useMemo(() => {
    let dwedsss = {
      lang: null,
      user_id: null,
      layout: null
    }

    if (dwedsss.layout === null) {
      dwedsss = {
        lang: lang,
        user_id: user_id,
        layout: layout
      }
    } else {
      return dwedsss
    }

    return dwedsss
  }, [lang, user_id, layout])

  /**
   * Открыть карточку
   */
  const handleOpenCard = useCallback((layout) => {
    if (dwed.layout !== layout) {
      push({
        query: { lang, user_id, layout }
      })
    }

  }, [lang, user_id, dwed])

  const [group, setGroup] = useState<GROUPS_SWITCH_VALUES>(GROUPS_SWITCH_VALUES.ALBUMS)
  const changeGroup = useCallback((v) => {
      return setGroup(v)
    }
    , [])

  const layoutTab = useMemo(() => {
    switch (layout) {
      case 'photo':
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
      case 'video':
        return <div>video</div>
      case 'wall':
        return <div>wall</div>
      default:
        return null
    }
  }, [layout, group])


  return (
    <div className={cn()}>
      <div className={cn('TabButtons')}>
        <Text size={'4'} textTransform={'uppercase'} data-active={layout === 'wall'} onClick={() => handleOpenCard('wall')} children={'Стена'} />
        <Text size={'4'} textTransform={'uppercase'} data-active={layout === 'photo'} onClick={() => handleOpenCard('photo')} children={'Фото'} />
        <Text size={'4'} textTransform={'uppercase'} data-active={layout === 'video'} onClick={() => handleOpenCard('video')} children={'Видео'} />
        <Text size={'4'} textTransform={'uppercase'} data-active={layout === 'work'} onClick={() => handleOpenCard('work')} children={'Работа'} />
      </div>
      <div className={cn('Container')}>
        {layoutTab}
      </div>
    </div>
  )
})
