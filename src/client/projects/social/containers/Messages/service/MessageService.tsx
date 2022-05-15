import React, { useState } from 'react'
import { BehaviorSubject, tap } from 'rxjs'
import { createContext, useContextSelector } from 'use-context-selector'

import { useObservable } from '@client_shared/hooks/useObservable'
import { useCreateService } from '@client_shared/hooks/useCreateService'
import { Message } from '@client/projects/social/containers/UserMenu/data/messages'
import { DefaultObject } from '@client/public/models/defaultObject.model'
import { FoldersChat } from '../../Messages/data/foldersChats'
import { Messages } from '../Messages'
import { messageService, MessageServiceType } from './messge.service'


export interface FoldersUI extends FoldersChat {
  friends: number[]
  noFriends: number[]
}

export type FoldersUIObject = DefaultObject<FoldersUI>
export type MessageServiceState = {
  folders?: FoldersUIObject
  allMessages?: DefaultObject<Message[]>
  newMessages?: DefaultObject<Message[]>
  openFolderId?: number
  openUserIdChat?: number
  search?: string
}

export const stateMessageService$ = new BehaviorSubject<MessageServiceState>({
  folders: {},
  allMessages: {},
  newMessages: {},
  openFolderId: null,
  openUserIdChat: 3,
  search: ''
})

type MessageServiceContext = {
  store: MessageServiceState
}
export const MessageContext = createContext<MessageServiceContext>({ store: stateMessageService$.getValue() })

export const MessageService: React.FC = () => {
  const [store, set] = useState(stateMessageService$.getValue())
  useCreateService(stateMessageService$, store, set)

  console.log('MessageService', store)
  return (
    <MessageContext.Provider value={{ store }}>
      <Messages />
    </MessageContext.Provider>
  )
}

/**
 * Получение Мемоизированного значения из Стора конкретного сервиса
 * @param where
 */
export const useMessageServiceValue = <T extends keyof MessageServiceState>(where: T): MessageServiceState[T] => (
  useContextSelector<MessageServiceContext, MessageServiceState[T]>(MessageContext, (store) => store.store[where])
)

/**
 * Получение хука Хук для управления Стором конкретного сервиса
 * @param callback
 * @param where
 * TODO Чтото придумать с типизацией
 */
export const useMessageServiceAction = <R extends keyof MessageServiceState, P>(callback: keyof MessageServiceType, where?: keyof MessageServiceState) => {
  const storePiece = useContextSelector(MessageContext, (store) => store.store[where])
  return useObservable<P, Pick<MessageServiceState, R>>(
    // @ts-ignore
    messageService[callback],
    {
      subscribers$: [stateMessageService$],
      initial: stateMessageService$.getValue(),
      inject: {
        store: storePiece,
        api: (v: string | number) => `api-value[${v}]`
      },
    })
}
