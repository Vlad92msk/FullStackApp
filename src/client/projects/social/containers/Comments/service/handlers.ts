import { reduce, groupBy } from 'lodash'
import { CreateHandlers } from '@client/public/models/serviceHandler.model'
import { ServiceCommentsType, ServiceState } from './'
import { CommentType } from '@client/projects/social/containers/Comments/data/comments.data'

/**
 * Экшены
 */
export const commentsActions = {
  DEFAULT: state => state,
  INJECT__COMMENTS: (payload: { comments: CommentType[] }) => ({
    type: 'INJECT__COMMENTS',
    payload
  })
}
export type CommentsActions = typeof commentsActions
export type CommentsActionsKeys = keyof CommentsActions


/**
 * Хендлеры
 */
export type HandlersType = CreateHandlers<CommentsActionsKeys, ServiceState, CommentsActions>
export const handlersCreator = (): HandlersType => {

  return ({
    DEFAULT: s => s,
    INJECT__COMMENTS: (state, { comments }) => ({
      ...state,
      comments: reduce(comments, (acc: ServiceCommentsType, item) => (!item.appealToCommentId ? ({
          ...acc,
          [item.commentId]: {
            ...item,
            answers: reduce(
              comments.filter(({ appealToCommentId }) => appealToCommentId === item.commentId),
              (answersAcc, answersItem, i, arr) => ([...answersAcc,
                {
                  ...answersItem,
                  answers: arr.filter(({ appealToAnswerId }) => appealToAnswerId === answersItem.commentId)
                }
              ]), [])
          }
        }) : acc)
        , {} as ServiceCommentsType)
    })
  })
}
