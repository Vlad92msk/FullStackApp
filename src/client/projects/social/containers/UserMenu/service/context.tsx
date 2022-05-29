import { createContext, useContextSelector } from 'use-context-selector'
import { Action } from '@client_shared/utils/reducer'
import { userMenuActions } from './handlers'
import { initial, UseUserMenuState } from './'

type ContextMessageService = {
  store: UseUserMenuState
  dispatch: (action: Action) => void
}
export const ContextServiceUserMenu = createContext<ContextMessageService>({
  store: initial,
  dispatch: userMenuActions.DEFAULT
})


export const useServiceUserMenuSelector = <T extends keyof UseUserMenuState>(where: T): UseUserMenuState[T] => (
  useContextSelector<ContextMessageService, UseUserMenuState[T]>(ContextServiceUserMenu, ({ store }) => store[where])
)

export const useServiceUserMenuAction = () => (
  useContextSelector(ContextServiceUserMenu, ({ dispatch }) => dispatch)
)
