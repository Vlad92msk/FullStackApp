import { createContext, useContextSelector } from 'use-context-selector'
import { MessageServiceState } from './ServiceMessage'
import { MessageActions, MessageActionsKeys } from './handlers'

type MessageServiceContext = {
  store: MessageServiceState
  dispatch: MessageActions[keyof MessageActions]
}
export const ContextServiceMessage = createContext<MessageServiceContext>({ store: {}, dispatch: null })


export const useServiceMessageSelector = <T extends keyof MessageServiceState>(where: T): MessageServiceState[T] => (
  useContextSelector<MessageServiceContext, MessageServiceState[T]>(ContextServiceMessage, (store) => store.store[where])
)
/**
 * TODO: типизировать
 */
export const useServiceMessageAction = <T extends MessageActionsKeys>() => (
  useContextSelector<MessageServiceContext, MessageActions[MessageActionsKeys]>(ContextServiceMessage, (store) => store.dispatch)
)
