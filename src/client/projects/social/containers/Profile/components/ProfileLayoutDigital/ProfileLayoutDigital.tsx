import React, { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { Switcher } from '@client/projects/social/components'
import { makeCn } from '@client_shared/utils'
import { PhotoAlbumType } from '../../../Profile/data/photoAlbums.data'
import { PhotoType } from '../../../Profile/data/photoItems.data'
import { DigitalCard, AlbumCardContainer } from '../../../Profile/components'
import { useChangeAlbumIdPhoto, useDragEnd } from './hooks'
import styles from './ProfileLayoutDigital.module.scss'


const cn = makeCn('ProfileLayoutDigital', styles)

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
  allItems: PhotoType[]
  albums: PhotoAlbumType[]
}

/**
 * Раздел Профиля - Контент-компонет для Видео или Фото
 */
export const ProfileLayoutDigital: React.FC<ProfileLayoutsPhotoType> = React.memo((props) => {
  const { allItems, albums, userId } = props

  const [photos, setPhotos] = useState<PhotoType[]>(allItems)
  const [photoAlbums, setPhotoAlbums] = useState(albums)

  /**
   * TODO: Эксперимент
   * Пробую выносить всю логику за компоненту
   * Мотивация:
   * - уменьшить кол-во кода в компоненте
   * - научиться писать максимально читаемый код
   */
  const handleChangePhoto = useChangeAlbumIdPhoto(setPhotos)
  const onDragEnd = useDragEnd(handleChangePhoto)

  /**
   * Группировка (альбомная/все)
   */
  const [group, setGroup] = useState<GROUPS_SWITCH_VALUES>(GROUPS_SWITCH_VALUES.ALBUMS)

  return (
    <div className={cn()}>
      <div className={cn('FiltersContainer')}>
        <div className={cn('FiltersRow')}>Filter</div>
        <Switcher
          currentValue={group}
          onChange={setGroup}
          options={GROUPS_SWITCH}
        />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        {(() => {
          switch (group) {
            case GROUPS_SWITCH_VALUES.ALBUMS:
              return (
                <AlbumCardContainer
                  albums={photoAlbums}
                  photos={photos}
                  userId={userId}
                />
              )
            case GROUPS_SWITCH_VALUES.ALL:
              return (
                <Droppable droppableId={'allItems'} key={'allItems'}>
                  {({ innerRef, droppableProps }, snapshot) => (
                    <div
                      {...droppableProps}
                      ref={innerRef}
                      className={cn('Photos', { dndActive: snapshot.isDraggingOver })}
                    >
                      {photos?.map((photo, i) => (
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
              )
            default:
              return null
          }
        })()}
      </DragDropContext>
    </div>
  )
})
