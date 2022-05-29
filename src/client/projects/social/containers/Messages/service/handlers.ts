import lodash from 'lodash'
import { DefaultObject } from '@client/public/models/defaultObject.model'
import { CreateHandlers } from '@client/public/models/serviceHandler.model'
import { FoldersChat } from '../data/foldersChats'
import { Message } from '../data/messages'
import { MessageServiceState } from './'


export const messageActions = {
  INJECT__FOLDERS_API: (payload: { folders: FoldersChat[], friends: number[], userId: number }) => ({
    type: 'INJECT__FOLDERS_API',
    payload
  }),
  SEARCH__CHAT: (payload: { value: string }) => ({
    type: 'SEARCH__CHAT',
    payload
  }),
  INJECT__MESSAGE_API: (payload: { allMessages: Message[], userId: number }) => ({
    type: 'INJECT__MESSAGE_API',
    payload
  }),
  SET__OPEN_FOLDER_ID: (payload: number) => ({
    type: 'SET__OPEN_FOLDER_ID',
    payload
  }),
  SET__OPEN_CHAT_ID: (payload: { userId: number }) => ({
    type: 'SET__OPEN_CHAT_ID',
    payload
  }),
  SET__NEW_MESSAGE_PUSH: (payload: { message: Message, prev: DefaultObject<Message[]>, userId: number }) => ({
    type: 'SET__NEW_MESSAGE_PUSH',
    payload
  }),
  DEFAULT: state => state
}
export type MessageActions = typeof messageActions
export type MessageActionsKeys = keyof MessageActions


export type HandlersType = CreateHandlers<MessageActionsKeys, MessageServiceState, MessageActions>
export const handlers: HandlersType = {
  SEARCH__CHAT: (state, { value }) => ({
    ...state,
    search: value
  }),
  INJECT__FOLDERS_API: (state, { folders, friends, userId }) => ({
    ...state,
    folders: lodash(folders.filter(({ ownerId }) => ownerId === userId))
    .map((folder) => ({
      ...folder,
      friends: lodash.intersection(friends, folder.users), // оставлет повторяющиеся значени
      noFriends: lodash.reject(folder.users, (id) => friends.includes(id)) // возвращает массив не удовлетворяющий условию
    }))
    .keyBy('id')
    .value()
  }),
  INJECT__MESSAGE_API: (state, { allMessages, userId }) => {
    const res = ({ allMessages: allMessages.filter(({ toUserId }) => toUserId === userId) })
    return ({
      ...state,
      allMessages: lodash(res.allMessages)
      .groupBy(({ fromUserId }) => fromUserId)
      .value(),
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
}
