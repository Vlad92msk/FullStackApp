import { useCallback } from 'react'
import { createContext, useContextSelector } from "use-context-selector";

import { UserType } from '@client/projects/social/containers/App/data/user'
import { createObservableStore, useCreateObservableStore } from '@client/shared/hooks/useCreateObservableStore'


type UseUserMenuState = {
  friends?: UserType[]
  possibleFriends?: UserType[]
  currenUser?: UserType
  notification?: any
  hashes?: any
}

const initial: UseUserMenuState = {
  friends: [],
  possibleFriends: [],
  currenUser: null,
  notification: null,
  hashes: null
}
export const UserMenuContext = createContext<UseUserMenuState>(initial)
export const userMenuContainer$ = createObservableStore<UseUserMenuState>(initial)

/**
 * Состояние в целом
 */
export const useUserMenuState = () => useCreateObservableStore(userMenuContainer$, initial)

/**
 * Вызов изменения
 * @param stream$
 */
export const useUserMenuStateChange = (stream$): (newVal: UseUserMenuState) => void => (
  useCallback((newVal: UseUserMenuState) => stream$.next(newVal), [stream$])
)

/**
 * Получение значения из контекста
 * @param where
 */
// @ts-ignore
export const useUserMenuStateValue = <T>(where?: keyof UseUserMenuState): T => (
  useContextSelector<UseUserMenuState, UseUserMenuState[keyof UseUserMenuState]>(UserMenuContext, s => s[where])
)

