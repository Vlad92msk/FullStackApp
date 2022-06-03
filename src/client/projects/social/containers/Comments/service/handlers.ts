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
  }),
  SET__COMMENT_FOR_ENTITY: (payload: { inputValue: string }) => ({
    type: 'SET__COMMENT_FOR_ENTITY',
    payload
  }),
  SET__COMMENT_FOR_COMMENT: (payload: { inputValue: string }) => ({
    type: 'SET__COMMENT_FOR_COMMENT',
    payload
  }),
  SET__COMMENT_FOR_ANSWER: (payload: { inputValue: string }) => ({
    type: 'SET__COMMENT_FOR_ANSWER',
    payload
  }),
  SET__OPEN_COMMENT_ID: (payload: { commentId: string }) => ({
    type: 'SET__OPEN_COMMENT_ID',
    payload
  }),
  SET__OPEN_MODAL_FOR_VIEW_ANSWERS: (payload: { comment: ServiceCommentsType }) => ({
    type: 'SET__OPEN_MODAL_FOR_VIEW_ANSWERS',
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
    }),
    SET__COMMENT_FOR_ENTITY: (state, { inputValue }) => ({
      ...state,
      commentForEntityInput: inputValue
    }),
    SET__COMMENT_FOR_COMMENT: (state, { inputValue }) => ({
      ...state,
      commentForCommentInput: inputValue
    }),
    SET__COMMENT_FOR_ANSWER: (state, { inputValue }) => ({
      ...state,
      answerForCommentInput: inputValue
    }),
    SET__OPEN_COMMENT_ID: (state, { commentId }) => ({
      ...state,
      openCommentId: commentId
    }),
    SET__OPEN_MODAL_FOR_VIEW_ANSWERS: (state, { comment }) => ({
      ...state,
      modalComment: comment
    })
  })
}
