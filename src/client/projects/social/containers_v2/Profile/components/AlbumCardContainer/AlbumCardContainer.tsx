import React from 'react'
import { Droppable } from 'react-beautiful-dnd'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { AlbumCard, DigitalCard } from '@client/projects/social/containers_v2/Profile/components'
import { PhotoType } from '../../data/photoItems.data'
import { PhotoAlbumType } from '../../data/photoAlbums.data'
import styles from './AlbumCardContainer.module.scss'

const cn = makeCn('AlbumCardContainer', styles)


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
          {albums.map((album, i) => (
            <AlbumCard
              key={album.id}
              {...album}
              index={i}
              userId={userId}
              photo={photos.filter(({ albumId }) => albumId === album.id)}
            />
          ))}
        </div>
      </div>
      <div className={cn('Container')}>
        <Text className={cn('Title')} size={'2'} children={'Фото не в альбомах'} />
        <Droppable droppableId={'allItems'} key={'allItems'}>
          {({ innerRef, droppableProps }, snapshot) => (
            <div
              {...droppableProps}
              ref={innerRef}
              className={cn('Content', { dndActive: snapshot.isDraggingOver })}
            >
              {photos.filter(({ albumId }) => !Boolean(albumId)).map((photo, i) => (
                <DigitalCard
                  key={photo.id}
                  index={i}
                  userId={userId}
                  item={photo}
                />
              ))}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  )
})
