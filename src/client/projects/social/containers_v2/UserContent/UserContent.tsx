import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { AlbumCard, PhotoCard, ProfileCard } from './components'
import { PHOTO_ALBUMS } from './data/photoAlbums.data'
import { PHOTO } from './data/photos.data'
import styles from './UserContent.module.scss'

const cn = makeCn('UserContent', styles)


export const UserContent: React.FC = React.memo(() => {
  const { query: { layout, albumId } } = useRouter()

  return (
    <div className={cn()}>
      <Text className={cn('Title')} size={'5'} weight={'bold'} textTransform={'uppercase'} children={'Профиль'} />
      <div className={cn('Container')}>

        <ProfileCard name={'photo'} title={'Фото'}>
          {
            (layout === 'photo' && !Boolean(albumId)) ? PHOTO_ALBUMS.map((album) => (
              <AlbumCard
                key={album.id}
                {...album}
              />
            )) : PHOTO.map((photo) => (
              <PhotoCard key={photo.id} id={photo.id} {...photo} />
            ))
          }
        </ProfileCard>

        <ProfileCard name={'UserContent'} title={'Профиль'}>
          <div>Профиль</div>
        </ProfileCard>

        <ProfileCard name={'video'} title={'Видео'}>
          <div>Видео</div>
        </ProfileCard>

        <ProfileCard name={'ribbon'} title={'Лента'}>
          <div>Лента</div>
        </ProfileCard>

        <ProfileCard name={'articles'} title={'Статьи'}>
          <div>Статьи</div>
        </ProfileCard>

        <ProfileCard name={'job'} title={'Работа'}>
          <div>Работа</div>
        </ProfileCard>

        <ProfileCard name={'mentor'} title={'Менторство'}>
          <div>Менторство</div>
        </ProfileCard>

      </div>
    </div>
  )
})
