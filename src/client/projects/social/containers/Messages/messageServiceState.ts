import { useCallback, useEffect, useState } from 'react'
import { createContext, useContextSelector } from 'use-context-selector'
import { BehaviorSubject, map, scan } from 'rxjs'
import { useObservableState } from 'observable-hooks'
import lodash from 'lodash'

import { FoldersChat } from '@client/projects/social/containers/Messages/data/foldersChats'
import { Message } from '@client/projects/social/containers/UserMenu/data/messages'
import { UserType } from '@client/projects/social/containers/App/data/user'
import { createObservableStore } from '@client/shared/hooks/useCreateObservableStore'
import { DefaultObject } from '@client/public/models/defaultObject.model'
import { verifyAndLint } from 'next/dist/lib/verifyAndLint'
import { useObservable } from 'rxjs-hooks'

interface FoldersUI extends FoldersChat {
  friends: number[]
  noFriends: number[]
}

type FoldersUIObject = DefaultObject<FoldersUI>
type MessageServiceState = {
  folders?: FoldersUIObject
  allMessages?: DefaultObject<Message[]>
  newMessages?: DefaultObject<Message[]>
  openFolderId?: number
  openUserIdChat?: number
  search?: string
}

export type MessageServiceActions = {
  searchInput?: (payload: Payload) => void,
  foldersApi?: (payload: { folders: FoldersChat[], userId: number, friends: number[] }) => void,
  allMessagesApi?: (payload: { allMessages: Message[], userId: number }) => void,
  changeOpenFolderId?: (payload: number) => void,
  getMessageFrom?: (payload: { friends: number[] }) => void,
  openUserIdChat?: (payload: { userId: number }) => void,
  sendNewMessage?: (payload: { message: Message, userId: number, prev: DefaultObject<Message[]> }) => void,
}

const initial: MessageServiceState = {
  folders: {},
  allMessages: {},
  newMessages: {},
  openFolderId: null,
  openUserIdChat: 3,
  search: '',
}


export const MessageContext = createContext<MessageServiceState>(initial)
export const message$ = createObservableStore<MessageServiceState>(initial)

type Payload = {
  value?: string, name?: string
}

type Complete = {
  res: any,
  actions?: any[]
}

type MessageService = {
  store: MessageServiceState,
  messageActions: MessageServiceActions
}

export const useMessageService = (): MessageService => {
  const [store, set] = useState<MessageServiceState>(initial)
  console.log('store', store)

  /**
   * Helpers
   */
  const setStore = useCallback((date) => {
    set(prev => ({ ...prev, ...date }))
  }, [])
  const complete = useCallback(({ res, actions }: Complete) => {
    setStore(res)
    if (actions) {
      actions.map((f) => f)
    }
    return res
  }, [])

  /**
   * Actions
   */

  const searchInput: [string, MessageServiceActions['searchInput']] = useObservableState((input$) => input$.pipe(
    map(({ value }) => complete({
      res: { search: value }
    }))
  ), store.search)

  const foldersApi: [FoldersUIObject, MessageServiceActions['foldersApi']] = useObservableState(input$ => input$.pipe(
    map(({ folders, userId, friends }) => {
      return complete({
        res: {
          folders: lodash(folders.filter(({ ownerId }) => ownerId === userId))
          .map((folder) => ({
            ...folder,
            friends: lodash.intersection(friends, folder.users), // оставлет повторяющиеся значени
            noFriends: lodash.reject(folder.users, (id) => friends.includes(id)) // возвращаетм ассив не удовлетворяющий условию
          }))
          .keyBy('id')
          .value()
        }
      })
    })
  ), store.folders)

  const allMessagesApi: [Message[], MessageServiceActions['allMessagesApi']] = useObservableState(input$ => input$.pipe(
    map(({ allMessages, userId }) => {
      const res = ({ allMessages: allMessages.filter(({ toUserId }) => toUserId === userId) })

      return complete({
        res: {
          allMessages: lodash(res.allMessages)
          .groupBy(({ fromUserId }) => fromUserId)
          .value(),
          newMessages: lodash(res.allMessages)
          .filter(({ dateSeen }) => !Boolean(dateSeen))
          .groupBy(({ fromUserId }) => fromUserId)
          .value()
        }
      })
    })
  ), store.allMessages)

  const changeOpenFolderId = useObservableState(input$ => input$.pipe(
    map((folderId) => complete({
      res: { openFolderId: folderId }
    }))
  ), store.openFolderId)


  const openUserIdChat: [number, MessageServiceActions['openUserIdChat']] = useObservableState((input$, init) => input$.pipe(
    map(({ userId }) => {
      return complete({
        res: { openUserIdChat: userId }
      })
    })
  ), store.openUserIdChat)

  const sendNewMessage: [{ message: Message, userId: number }, MessageServiceActions['sendNewMessage']] = useObservableState((input$) => input$.pipe(
    map(({ message, prev }) => {
      return complete({
        res: {
          allMessages: {
            ...prev,
            [message.toUserId]: [...prev[message.toUserId], message]
          }
        }
      })
    })
  ))


  return ({
    store,
    messageActions: {
      searchInput: searchInput[1],
      foldersApi: foldersApi[1],
      allMessagesApi: allMessagesApi[1],
      changeOpenFolderId: changeOpenFolderId[1],
      openUserIdChat: openUserIdChat[1],
      sendNewMessage: sendNewMessage[1]
    }
  })
}

export const MessageContext1 = createContext<MessageService>({ store: initial, messageActions: {} })

export const useMessageServiceStore = <T extends keyof MessageServiceState>(where: T): MessageServiceState[T] => (
  useContextSelector<MessageService, MessageServiceState[T]>(MessageContext1, (store) => store.store[where])
)

export const useMessageServiceActions = <T extends keyof MessageServiceActions>(action: T): MessageServiceActions[T] => (
  useContextSelector<MessageService, MessageServiceActions[T]>(MessageContext1, (store) => store.messageActions[action])
)


/**
 * Вызов изменения
 * @param stream$
 */
export const useUseMessageStateChange = (stream$): (newVal: MessageServiceState) => void => (
  useCallback((newVal: MessageServiceState) => stream$.next(newVal), [stream$])
)

/**
 * Получение значения из контекста
 * @param where
 */
// @ts-ignore
export const useMessageStateValue = <T>(where?: keyof MessageServiceState): T => (
  useContextSelector<MessageServiceState, MessageServiceState[keyof MessageServiceState]>(MessageContext, s => s[where])
)


