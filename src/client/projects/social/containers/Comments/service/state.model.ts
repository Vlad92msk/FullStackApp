import { CommentType } from '@client/projects/social/containers/Comments/data/comments.data'

export interface ServiceCommentsType extends CommentType {
  answers: CommentType[]
}

export type ServiceState = {
  appealToEntityId: number
  commentsApi: CommentType[]
  comments: {
    [key: string]: ServiceCommentsType
  }
  openCommentId: string
  modalComment: ServiceCommentsType
}


export const initial: ServiceState = {
  appealToEntityId: null,
  commentsApi: [],
  comments: {},
  openCommentId: '',
  modalComment: null
}
