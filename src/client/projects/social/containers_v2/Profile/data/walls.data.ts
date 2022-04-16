export const WALLS_DATA = [
  { userId: 1, wallId: 1 },
  { userId: 2, wallId: 2 },
  { userId: 3, wallId: 3 }
]

export const WALL_RECORDS = [
  {
    id: 1,
    userId: 1,
    userName: 'dwede',
    userAva: 'ava',
    dateCreated: new Date(),
    recordText: 'text',
    recordImg: 'ava',
    recordVideo: null,
    commentsCount: 2,
    comments: [],
    likesCount: 321,
    dislikeCounts: 69,
  },
  {
    id: 2,
    userId: 1,
    userName: 'dwede',
    userAva: 'ava',
    dateCreated: new Date(),
    recordText: 'text',
    recordImg: 'ava',
    recordVideo: null,
    commentsCount: 2,
    comments: [],
    likesCount: 321,
    dislikeCounts: 69,
  },
  {
    id: 3,
    userId: 1,
    userName: 'dwede',
    userAva: 'ava',
    dateCreated: new Date(),
    recordText: 'text',
    recordImg: 'ava',
    recordVideo: null,
    commentsCount: 2,
    comments: [],
    likesCount: 321,
    dislikeCounts: 69,
  },
]

export type WallRecordItemType = typeof WALL_RECORDS[0]
