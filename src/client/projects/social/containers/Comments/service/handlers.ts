import { CreateHandlers } from '@client/public/models/serviceHandler.model'
import { ServiceState } from './'

/**
 * Экшены
 */
export const commentsActions = {
  DEFAULT: state => state
}
export type CommentsActions = typeof commentsActions
export type CommentsActionsKeys = keyof CommentsActions



/**
 * Хендлеры
 */
export type HandlersType = CreateHandlers<CommentsActionsKeys, ServiceState, CommentsActions>
export const handlersCreator = (): HandlersType => {

  return ({
    DEFAULT: s => s
  })
}
