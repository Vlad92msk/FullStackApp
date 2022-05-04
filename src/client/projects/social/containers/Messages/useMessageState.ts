import { useCallback } from 'react'
import { createContext, useContextSelector } from "use-context-selector";

import { FoldersChat } from '@client/projects/social/containers/Messages/data/foldersChats'
import { Message } from '@client/projects/social/containers/UserMenu/data/messages'
import { UserType } from '@client/projects/social/containers/App/data/user'
import { createObservableStore, useCreateObservableStore } from '@client/shared/hooks/useCreateObservableStore'


type UseMessageState = {
  folders?: FoldersChat[]
  allMessages?: Message[]
  newMessages?: Message[]
  openFolderId?: number
  currentUsersChats?: UserType[]
  openUserIcChat?: number
  search?: string
  allNewMessageCount?: number
  messageFromFriends?: Message[]
  messageNotFromFriends?: Message[]
}

const initial: UseMessageState = {
  folders: [],
  allMessages: [],
  newMessages: [],
  openFolderId: null,
  openUserIcChat: 3,
  search: '',
  allNewMessageCount: null,
  messageFromFriends: [],
  messageNotFromFriends: [],
  currentUsersChats: []
}

export const MessageContext = createContext<UseMessageState>(initial)
export const message$ = createObservableStore<UseMessageState>(initial)

/**
 * Состояние в целом
 */
export const useMessageState = () => useCreateObservableStore(message$, initial)

/**
 * Вызов изменения
 * @param stream$
 */
export const useUseMessageStateChange = (stream$): (newVal: UseMessageState) => void => (
  useCallback((newVal: UseMessageState) => stream$.next(newVal), [stream$])
)

/**
 * Получение значения из контекста
 * @param where
 */
// @ts-ignore
export const useMessageStateValue = <T>(where?: keyof UseMessageState): T => (
  useContextSelector<UseMessageState, UseMessageState[keyof UseMessageState]>(MessageContext, s => s[where])
)


