import { createContext, useContextSelector } from 'use-context-selector'
import { Action } from '@client/shared/utils/reducer'
import { messageActions } from './handlers'
import { initial, MessageServiceState } from './'

type MessageServiceContext = {
  store: MessageServiceState
  dispatch: (action: Action) => void
}
export const ContextServiceMessage = createContext<MessageServiceContext>({
  store: initial,
  dispatch: messageActions.DEFAULT
})


export const useServiceMessageSelector = <T extends keyof MessageServiceState>(where: T): MessageServiceState[T] => (
  useContextSelector<MessageServiceContext, MessageServiceState[T]>(ContextServiceMessage, (store) => store.store[where])
)
/**
 * TODO: типизировать
 */
export const useServiceMessageAction = () => (
  useContextSelector(ContextServiceMessage, (store) => store.dispatch)
)
