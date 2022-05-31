import { createContext, useContextSelector } from 'use-context-selector'
import { Action } from '@client_shared/utils/reducer'
import { commentsActions } from './handlers'
import { initial, ServiceState } from './'

type ContextService = {
  store: ServiceState
  dispatch: (action: Action) => void
}
export const ContextService = createContext<ContextService>({
  store: initial,
  dispatch: commentsActions.DEFAULT
})


export const useServiceCommentsSelector = <T extends keyof ServiceState>(where: T): ServiceState[T] => (
  useContextSelector<ContextService, ServiceState[T]>(ContextService, (store) => store.store[where])
)
/**
 * TODO: типизировать
 */
export const useServiceCommentsAction = () => (
  useContextSelector(ContextService, (store) => store.dispatch)
)
