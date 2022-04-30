import { DropResult } from 'react-beautiful-dnd'

export const dndGetItemProps = (res: DropResult) => ({
  /**
   * ID переносимого элемента
   */
  itemId: Number(res.draggableId.match(/\[(.*)\]/)[1]),
  /**
   * ID альбома в который переместить
   * Если перемещается во ВСЕ - null (чтоб сбросить albumId на null)
   */
  toAlbumId: res.destination.droppableId === 'allItems' ? null : Number(res.destination.droppableId.match(/\[(.*)\]/)[1])
})
