import { Dispatch, SetStateAction, useCallback } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { dndGetItemProps } from '../../components/ProfileLayoutDigital/utils'
import { PhotoType } from '../../data/photoItems.data'

/**
 * Переносит эелемент
 * @param onChange
 */
export const useDragEnd = (
  onChange: (id: number, albumId: number) => void
) => useCallback((result: DropResult
) => {
  const { source, destination } = result
  if (!destination || (destination.droppableId === source.droppableId)) return

  const { itemId, toAlbumId } = dndGetItemProps(result)

  onChange(itemId, toAlbumId)
}, [])

/**
 * Меняет ID альбома у элемента
 * @param set
 */
export const useChangeAlbumIdPhoto = (
  set: Dispatch<SetStateAction<PhotoType[]>>
) => useCallback((
  id: number,
  albumId: number
) => {
  set(prev => prev.reduce((acc: PhotoType[], item: PhotoType) => [...acc, ({
    ...item,
    albumId: item.id === id ? albumId : item.albumId
  })], []))
}, [])
