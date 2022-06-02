import { CommentType } from '@client/projects/social/containers/Comments/data/comments.data'

export interface ServiceCommentsType extends CommentType {
  answers: CommentType[]
}

export type ServiceState = {
  comments: {
    [key: string]: ServiceCommentsType
  }
}


export const initial: ServiceState = {
  comments: {}
}
