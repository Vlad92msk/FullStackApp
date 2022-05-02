export type FoldersChat = {
  id: number
  ownerId: number
  name: string
  users: number[]
}

export const FOLDERS_CHATS: FoldersChat[] = [
  {
    id: 1,
    ownerId: 1,
    name: 'ПутинВор',
    users: [5]
  },
  {
    id: 2,
    ownerId: 1,
    name: 'ПутинВор2',
    users: [2, 3, 4]
  },
  {
    id: 3,
    ownerId: 1,
    name: 'ПутинВор3',
    users: [2, 4]
  },
  {
    id: 4,
    ownerId: 1,
    name: 'ПутинВор4',
    users: [2, 3, 4, 5, 6, 7, 8, 9, 10]
  }
]
