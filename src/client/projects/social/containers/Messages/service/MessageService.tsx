import React, { useEffect, useState } from 'react'
import { BehaviorSubject, distinctUntilChanged, of, scan, share, switchMap, tap } from 'rxjs'
import { createContext, useContextSelector } from 'use-context-selector'

import { Callback, distinctUntilPropertyChanged, useObservable } from '@client_shared/hooks/useObservable'
import { Message } from '@client/projects/social/containers/UserMenu/data/messages'
import { DefaultObject } from '@client/public/models/defaultObject.model'
import { FoldersChat } from '../../Messages/data/foldersChats'
import { Messages } from '../Messages'


interface FoldersUI extends FoldersChat {
  friends: number[]
  noFriends: number[]
}

type FoldersUIObject = DefaultObject<FoldersUI>
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
  const [messageServiceState, set] = useState(stateMessageService$.getValue())
  console.log('messageServiceState', messageServiceState)

  useEffect(() => {
    const result = stateMessageService$.pipe(
      distinctUntilChanged(),
      distinctUntilPropertyChanged(),
      /**
       * Обновляем данные в сторе
       */
      tap((v: MessageServiceState) => set(prev => ({ ...prev, ...v }))),
      /**
       * Возвращаем те данные, что вернул эффект
       * для того, чтобы в кортеже возвращать [результат, сетРезультат]
       * а не весь Стор
       */
      switchMap((payload) => of(payload).pipe(
        scan((acc, item) => ({ ...acc, ...item }), messageServiceState)
      )),
      /**
       * Хз - надо это или нет
       */
      share()
    ).subscribe(v => v)

    return () => result.unsubscribe()
  }, [stateMessageService$])

  return (
    <MessageContext.Provider value={{ store: messageServiceState }}>
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
 */
export const useMessageServiceAction = <R extends keyof MessageServiceState>(callback: Callback, where?: keyof MessageServiceState) => {
  const store = useContextSelector(MessageContext, (store) => store.store[where])
  return useObservable<Pick<MessageServiceState, R>, any>(
    callback,
    {
      subscribers$: [stateMessageService$],
      initial: stateMessageService$.getValue(),
      inject: {
        store,
        api: (v: string | number) => `api-value[${v}]`
      }
    })
}
