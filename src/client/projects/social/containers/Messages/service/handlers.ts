import lodash from 'lodash'
import { DefaultObject } from '@client/public/models/defaultObject.model'
import { CreateHandlers } from '@client/public/models/serviceHandler.model'
import { FoldersChat } from '../data/foldersChats'
import { Message } from '../data/messages'
import { ServiceState } from './'
import { storageGet } from '@client/shared/utils'
import { LocalStorageEnum } from '@client/public/models/localStorage'
import { ServiceState as UserMenuState } from '@client/projects/social/containers/UserMenu/service'
import { UserType } from '@client/projects/social/containers/App/data/user'

/**
 * Экшены
 */
export const messageActions = {
  /**
   * Добавить папки в сервис
   */
  INJECT__FOLDERS_API: (payload: { folders: FoldersChat[] }) => ({
    type: 'INJECT__FOLDERS_API',
    payload
  }),
  /**
   * Найти чат с пользователем по его имени фамилии
   */
  SEARCH__CHAT: (payload: { value: string }) => ({
    type: 'SEARCH__CHAT',
    payload
  }),
  /**
   * Добавить сообщения в сервис
   */
  INJECT__MESSAGE_API: (payload: { allMessages: Message[] }) => ({
    type: 'INJECT__MESSAGE_API',
    payload
  }),
  /**
   * Открыть папку
   */
  SET__OPEN_FOLDER_ID: (payload: number) => ({
    type: 'SET__OPEN_FOLDER_ID',
    payload
  }),
  /**
   * Открыть чат с пользователем
   */
  SET__OPEN_CHAT_ID: (payload: { userId: number }) => ({
    type: 'SET__OPEN_CHAT_ID',
    payload
  }),
  /**
   * Отправка сообщения
   */
  SET__NEW_MESSAGE_PUSH: (payload: { message: Message, prev: DefaultObject<Message[]>, userId: number }) => ({
    type: 'SET__NEW_MESSAGE_PUSH',
    payload
  }),
  DEFAULT: state => state
}
export type MessageActions = typeof messageActions
export type MessageActionsKeys = keyof MessageActions



/**
 * Хендлеры
 */
export type HandlersType = CreateHandlers<MessageActionsKeys, ServiceState, MessageActions>
export const handlersCreator = (): HandlersType => {
  const userInfo = storageGet(LocalStorageEnum.USER_INFO) as UserType

  return ({
    SEARCH__CHAT: (state, { value }) => ({
      ...state,
      search: value
    }),
    INJECT__FOLDERS_API: (state, { folders }) => ({
      ...state,
      folders: lodash(folders.filter(({ ownerId }) => ownerId === userInfo.id))
      .map((folder) => ({
        ...folder,
        friends: lodash.intersection(userInfo.friends, folder.users), // оставлет повторяющиеся значени
        noFriends: lodash.reject(folder.users, (id) => userInfo.friends.includes(id)) // возвращает массив не удовлетворяющий условию
      }))
      .keyBy('id')
      .value()
    }),
    INJECT__MESSAGE_API: (state, { allMessages }) => {

      const res = ({ allMessages: allMessages.filter(({ toUserId }) => toUserId === userInfo.id) })
      return ({
        ...state,
        allMessages: lodash(res.allMessages)
        .groupBy(({ fromUserId }) => fromUserId)
        .value()
      })
    },
    SET__OPEN_FOLDER_ID: (state, payload) => ({
      ...state,
      openFolderId: payload
    }),
    SET__OPEN_CHAT_ID: (state, payload) => ({
      ...state,
      openUserIdChat: payload.userId
    }),
    SET__NEW_MESSAGE_PUSH: (state, { message, prev }) => {
      const isFirst = prev[message.toUserId]
      const newMessage = !isFirst ? (lodash.defaults(prev, {
        [message.toUserId]: [message]
      })) : ({
        [message.toUserId]: [...prev[message.toUserId], message]
      })
      return {
        ...state,
        allMessages: {
          ...prev,
          ...newMessage
        }
      }
    },
    DEFAULT: s => s
  })
}
