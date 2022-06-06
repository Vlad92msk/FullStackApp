import { AddedFile } from '@client/shared/hooks/useMaterialsAttach'

export const WALLS_DATA = [
  { userId: 1, wallId: 1 },
  { userId: 2, wallId: 2 },
  { userId: 3, wallId: 3 }
]

export const WALL_RECORDS:WallRecordItemType[] = [
  {
    id: 6465,
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
    attachments: null
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
    attachments: null
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
    attachments: null
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
  attachments?: AddedFile[]
}

export type WallNewRecordItemType = {
  userId?: number,
  userName?: string,
  userAva?: string,
  dateCreated?: Date,
  recordText?: string,
  recordImg?: string,
  recordVideo?: null,
  attachments: AddedFile[]
}
