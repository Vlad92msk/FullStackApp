import { map } from 'rxjs'
import lodash from 'lodash'

import { ServiceAction } from '@client/shared/hooks/useCreateService'
import { DefaultObject } from '@client/public/models/defaultObject.model'
import { InputPayload } from '@client/public/models/inputPayload.model'
import { MessageServiceState } from './MessageService'
import { FoldersChat } from '../data/foldersChats'
import { Message } from '../data/messages'

/**
 * Payload
 */
export type SEARCH__CHAT__PAYLOAD = InputPayload
export type INJECT__FOLDERS_API__PAYLOAD = { folders: FoldersChat[], userId: number, friends: number[] }
export type INJECT__MESSAGE_API__PAYLOAD = { allMessages: Message[], userId: number }
export type SET__OPEN_FOLDER_ID__PAYLOAD = number
export type SET__OPEN_CHAT_ID__PAYLOAD = { userId: number }
export type SET__NEW_MESSAGE_PUSH__PAYLOAD = { message: Message, userId: number, prev: DefaultObject<Message[]> }

/**
 * TODO чтото придумать с типизацией
 * как ее выводить из написанных функций или еще каким способом чтоб меньше / удобнее писать код
 */
export type MessageServiceType<S extends MessageServiceState = MessageServiceState> = {
  SEARCH__CHAT: ServiceAction<S, SEARCH__CHAT__PAYLOAD, 'search'>
  INJECT__FOLDERS_API: ServiceAction<S, INJECT__FOLDERS_API__PAYLOAD, 'folders'>
  INJECT__MESSAGE_API: ServiceAction<S, INJECT__MESSAGE_API__PAYLOAD, 'allMessages' | 'newMessages'>
  SET__OPEN_FOLDER_ID: ServiceAction<S, SET__OPEN_FOLDER_ID__PAYLOAD, 'openFolderId'>
  SET__OPEN_CHAT_ID: ServiceAction<S, SET__OPEN_CHAT_ID__PAYLOAD, 'openUserIdChat'>
  SET__NEW_MESSAGE_PUSH: ServiceAction<S, SET__NEW_MESSAGE_PUSH__PAYLOAD, 'allMessages'>
}

/**
 * SET - изменить значение
 * INJECT - Первичное добавление данных из метода
 */
export const messageService: MessageServiceType = {
  /**
   * Найти Чат с пользователем
   */
  SEARCH__CHAT: (input$) => input$.pipe(
    map(({ value }) => ({ search: value }))
  ),
  /**
   * Добавить в Стор папки из метода
   */
  INJECT__FOLDERS_API: (input$) => input$.pipe(
    map(({ folders, userId, friends }) => ({
        folders: lodash(folders.filter(({ ownerId }) => ownerId === userId))
        .map((folder) => ({
          ...folder,
          friends: lodash.intersection(friends, folder.users), // оставлет повторяющиеся значени
          noFriends: lodash.reject(folder.users, (id) => friends.includes(id)) // возвращает массив не удовлетворяющий условию
        }))
        .keyBy('id')
        .value()
      })
    )
  ),
  /**
   * Добавить в Стор сообщения из метода
   */
  INJECT__MESSAGE_API: (input$) => input$.pipe(
    map(({ allMessages, userId }) => {
        const res = ({ allMessages: allMessages.filter(({ toUserId }) => toUserId === userId) })

        return ({
          allMessages: lodash(res.allMessages)
          .groupBy(({ fromUserId }) => fromUserId)
          .value(),
          newMessages: lodash(res.allMessages)
          .filter(({ dateSeen }) => !Boolean(dateSeen))
          .groupBy(({ fromUserId }) => fromUserId)
          .value()
        })
      }
    )
  ),
  /**
   * Открыть папку
   */
  SET__OPEN_FOLDER_ID: (input$) => input$.pipe(
    map((folderId) => ({ openFolderId: folderId }))
  ),
  /**
   * Открыть чат с пользователем
   */
  SET__OPEN_CHAT_ID: (input$) => input$.pipe(
    map(({ userId }) => ({ openUserIdChat: userId }))
  ),
  /**
   * Отправить сообщение
   */
  SET__NEW_MESSAGE_PUSH: (input$) => input$.pipe(
    map(({ message, prev }) => {
      const isFirst = prev[message.toUserId]
      const newMessage = !isFirst ? (lodash.defaults(prev, {
        [message.toUserId]: [message]
      })) : ({
        [message.toUserId]: [...prev[message.toUserId], message]
      })

      return ({
        allMessages: {
          ...prev,
          ...newMessage
        }
      })
    })
  )
}
