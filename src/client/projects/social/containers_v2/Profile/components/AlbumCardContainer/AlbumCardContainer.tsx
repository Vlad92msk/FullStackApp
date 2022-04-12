import React, { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { AlbumCard, PhotoCard } from '@client/projects/social/containers_v2/Profile/components'
import { PhotoType } from '../../data/photos.data'
import { PhotoAlbumType } from '../../data/photoAlbums.data'
import styles from './AlbumCardContainer.module.scss'

const cn = makeCn('AlbumCardContainer', styles)


const initial = { opacity: 0, height: 0 }
const animate = { opacity: 1, height: 'auto' }
const transition = { duration: .5, ease: 'easeIn', delay: 1.5 }


export type AlbumCardContainerType = {
  albums: PhotoAlbumType[]
  photos: PhotoType[]
  userId: number
}

export const AlbumCardContainer: React.FC<AlbumCardContainerType> = React.memo((props) => {
  const { albums, photos, userId } = props

  return (
    <div className={cn()}>
      <div className={cn('Container')}>
        <Text className={cn('Title')} size={'2'} children={'Альбомы'} />
        <div className={cn('Content')}>
          {albums.map((album) => (
            <AlbumCard key={album.id} {...album} userId={userId} photo={photos.filter(({ albumId }) => albumId === album.id)} />
          ))}
        </div>
      </div>
      <div className={cn('Container')}>
        <Text className={cn('Title')} size={'2'} children={'Фото не в альбомах'} />
        <div className={cn('Content')}>
          {photos.filter(({ albumId }) => !Boolean(albumId)).map((photo) => (
            <PhotoCard key={photo.id} id={photo.id} userId={userId} {...photo} />
          ))}
        </div>
      </div>
    </div>
  )
})
