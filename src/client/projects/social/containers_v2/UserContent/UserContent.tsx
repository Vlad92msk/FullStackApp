import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { AlbumCard, PhotoCard, ProfileCard } from './components'
import { PHOTO_ALBUMS } from './data/photoAlbums.data'
import { PHOTO } from './data/photos.data'
import styles from './UserContent.module.scss'
import { AlbumCardContainer } from '@client/projects/social/containers_v2/UserContent/components/AlbumCardContainer/AlbumCardContainer'
import { USER_ID } from '@client/projects/social/containers_v2/NavBar'

const cn = makeCn('UserContent', styles)


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

  const [group, setGroup] = useState<string>('albums')
  const changeLang = useCallback((lang: React.SyntheticEvent<HTMLInputElement>) => {
      // @ts-ignore
      return setGroup(lang.target.id)
    }
    , [])

  const layoutTab = useMemo(() => {
    switch (layout) {
      case 'photo':
        return (
          <>
            <div className={cn('FiltersContainer')}>
              <div className={cn('FiltersRow')}>Filter</div>
              <div className={cn('FiltersSwitcher')}>
                <div style={{
                  display: 'flex',
                  overflow: 'hidden',
                  borderRadius: '15px',
                  width: 'fit-content',
                  border: '1px solid #6c738b'
                }}>
                  <input
                    className={cn('RadioInput')}
                    onChange={changeLang}
                    type={'radio'}
                    value={'albums'}
                    name={'groups'}
                    id={'albums'}
                    checked={group === 'albums'}
                  />
                  <label className={cn('RadioLabel')} htmlFor={'albums'}>альбомы</label>

                  <input
                    className={cn('RadioInput')}
                    onChange={changeLang}
                    type={'radio'}
                    value={'free'}
                    name={'groups'}
                    id={'free'}
                    checked={group === 'free'}
                  />
                  <label className={cn('RadioLabel')} htmlFor={'free'}>свободно</label>
                </div>
              </div>
            </div>
            {group === 'albums' && (
              <AlbumCardContainer
                albums={PHOTO_ALBUMS}
                photos={PHOTO}
                userId={USER_ID}
              />
            )}
            {
              group === 'free' && PHOTO.map((photo) => (<PhotoCard userId={USER_ID} key={photo.id} id={photo.id} {...photo} />))
            }
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
        <Text data-active={layout === 'wall'} onClick={() => handleOpenCard('wall')} children={'Стена'} />
        <Text data-active={layout === 'photo'} onClick={() => handleOpenCard('photo')} children={'Фото'} />
        <Text data-active={layout === 'video'} onClick={() => handleOpenCard('video')} children={'Видео'} />
        <Text data-active={layout === 'work'} onClick={() => handleOpenCard('work')} children={'Работа'} />
      </div>

      <div className={cn('Container')}>
        {layoutTab}
      </div>
    </div>
  )
})
