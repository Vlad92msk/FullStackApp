import { reduce } from 'lodash'
import { CommentType } from '@client/projects/social/containers/Comments/data/comments.data'
import { storageGet } from '@client/shared/utils'
import { LocalStorageEnum } from '@client/public/models/localStorage'
import { ServiceState as UserMenuState } from '@client/projects/social/containers/UserMenu/service'
import { createId } from '@client/shared/utils/createId'
import { ServiceCommentsType } from '@client/projects/social/containers/Comments/service'

/**
 * Создает объект комментария
 */
export const createComment = (value, appealToCommentId: string, appealToAnswerId: string, findComment: CommentType) => {
  const userInfo = storageGet(LocalStorageEnum.USER_INFO) as UserMenuState
  const { currenUser } = userInfo

  return ({
    commentId: createId(),
    description: value,
    appealToCommentId,
    appealToAnswerId,
    appealToUserId: findComment?.userId || null,
    appealToUserName: findComment?.userName || null,
    userId: currenUser.id,
    userName: `${currenUser.family} ${currenUser.name}`,
    userIdsDislikes: [],
    userIdsLikes: [],
    date: 'dwed'
  })
}

/**
 * Создает объект с комментариями для стора
 */
export const createCommentsToService = (comments: CommentType[]):ServiceCommentsType => reduce(comments, (acc: ServiceCommentsType, item) => (!item.appealToCommentId ? ({
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
