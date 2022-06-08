import { reduce } from 'lodash'
import { CreateHandlers } from '@client/public/models/serviceHandler.model'
import { ServiceCommentsType, ServiceState } from './'
import { CommentType } from '@client/projects/social/containers/Comments/data/comments.data'
import { storageGet } from '@client/shared/utils'
import { LocalStorageEnum } from '@client/public/models/localStorage'
import { ServiceState as UserMenuState } from '@client/projects/social/containers/UserMenu/service'
import { createComment, createCommentsToService } from '@client/projects/social/containers/Comments/utils'

/**
 * Экшены
 */
export const commentsActions = {
  DEFAULT: state => state,
  INJECT__ENTITY_ID: (payload: { entityId: number }) => ({
    type: 'INJECT__ENTITY_ID',
    payload
  }),
  INJECT__COMMENTS: (payload: { comments: CommentType[] }) => ({
    type: 'INJECT__COMMENTS',
    payload
  }),
  SET__OPEN_COMMENT_ID: (payload: { commentId: string }) => ({
    type: 'SET__OPEN_COMMENT_ID',
    payload
  }),
  SET__OPEN_MODAL_FOR_VIEW_ANSWERS: (payload: { comment: ServiceCommentsType }) => ({
    type: 'SET__OPEN_MODAL_FOR_VIEW_ANSWERS',
    payload
  }),
  SET__SENT_COMMENT: (
    payload: {
      targetCommentId: string,
      value: string,
      appealToCommentId: string,
      appealToAnswerId: string
    }) => ({
    type: 'SET__SENT_COMMENT',
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
  const userInfo = storageGet(LocalStorageEnum.USER_INFO) as UserMenuState
  const { currenUser } = userInfo

  return ({
    DEFAULT: s => s,
    INJECT__ENTITY_ID: (state, { entityId }) => ({
      ...state,
      appealToEntityId: entityId
    }),
    INJECT__COMMENTS: (state, { comments }) => ({
      ...state,
      commentsApi: comments,
      comments: createCommentsToService(comments)
    }),
    SET__OPEN_COMMENT_ID: (state, { commentId }) => ({
      ...state,
      openCommentId: commentId
    }),
    SET__OPEN_MODAL_FOR_VIEW_ANSWERS: (state, { comment }) => ({
      ...state,
      modalComment: comment
    }),
    SET__SENT_COMMENT: (state, { targetCommentId, value, appealToCommentId, appealToAnswerId }) => {
      const find = state.commentsApi.find(({ commentId: id }) => id === targetCommentId)

      const newComment: CommentType = {
        appealToEntityId: state.appealToEntityId,
        ...createComment(value, appealToCommentId, appealToAnswerId, find)
      }

      /**
       * TODO: ну вот это по идее не правильно т.к. 1 действие =  событие, а тут мы на 1 действие меняем сразу несколько параметров.. в Реакции по идее это надо вынести
       */
      return ({
        ...state,
        newComment,
        commentsApi: [...state.commentsApi, newComment],
        comments: createCommentsToService([...state.commentsApi, newComment])
      })
    }
  })
}
