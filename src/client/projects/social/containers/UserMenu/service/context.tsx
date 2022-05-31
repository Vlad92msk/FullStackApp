import { createContext, useContextSelector } from 'use-context-selector'
import { Action } from '@client_shared/utils/reducer'
import { userMenuActions } from './handlers'
import { initial, ServiceState } from './'

type ContextService = {
  store: ServiceState
  dispatch: (action: Action) => void
}
export const ContextService = createContext<ContextService>({
  store: initial,
  dispatch: userMenuActions.DEFAULT
})


export const useServiceUserMenuSelector = <T extends keyof ServiceState>(where: T): ServiceState[T] => (
  useContextSelector<ContextService, ServiceState[T]>(ContextService, ({ store }) => store[where])
)

export const useServiceUserMenuAction = () => (
  useContextSelector(ContextService, ({ dispatch }) => dispatch)
)
