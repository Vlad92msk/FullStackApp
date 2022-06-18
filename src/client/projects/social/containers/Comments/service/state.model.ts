import { CommentType } from '@client/projects/social/containers/Comments/data/comments.data'
import { Service } from '@client/public/models/service'

export interface ServiceCommentsType extends CommentType {
  answers: CommentType[]
}

export interface ServiceState extends Service {
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
