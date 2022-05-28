import { createContext, useContextSelector } from 'use-context-selector'
import { UserMenuActions, UserMEnuActionsKeys } from './handlers'
import { UseUserMenuState } from './ServiceUserMenu'

type ContextMessageService = {
  store: UseUserMenuState
  dispatch: UserMenuActions[keyof UserMenuActions]
}
export const ContextServiceUserMenu = createContext<ContextMessageService>({ store: {}, dispatch: null })


export const useServiceUserMenuSelector = <T extends keyof UseUserMenuState>(where: T): UseUserMenuState[T] => (
  useContextSelector<ContextMessageService, UseUserMenuState[T]>(ContextServiceUserMenu, (store) => store.store[where])
)
/**
 * TODO: типизировать
 */
export const useServiceUserMenuAction = <T extends UserMEnuActionsKeys>() => (
  useContextSelector<ContextMessageService, UserMenuActions[UserMEnuActionsKeys]>(ContextServiceUserMenu, (store) => store.dispatch)
)
