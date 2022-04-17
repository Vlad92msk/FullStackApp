export const WALLS_DATA = [
  { userId: 1, wallId: 1 },
  { userId: 2, wallId: 2 },
  { userId: 3, wallId: 3 }
]

export const WALL_RECORDS:WallRecordItemType[] = [
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

export type WallRecordItemType = {
  id: number,
  userId: number,
  userName: string,
  userAva: string,
  dateCreated: Date,
  recordText: string,
  recordImg: string,
  recordVideo: null,
  commentsCount: number,
  comments: [],
  likesCount: number,
  dislikeCounts: number,
}

export type WallNewRecordItemType = {
  userId?: number,
  userName?: string,
  userAva?: string,
  dateCreated?: Date,
  recordText?: string,
  recordImg?: string,
  recordVideo?: null,
}
