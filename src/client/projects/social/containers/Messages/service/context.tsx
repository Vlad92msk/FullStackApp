import { createContext, useContextSelector } from 'use-context-selector'
import { MessageServiceState } from './MessageService'
import { MessageActions, MessageActionsKeys } from './handlers'

type MessageServiceContext = {
  store: MessageServiceState
  dispatch: MessageActions[keyof MessageActions]
}
export const MessageContext = createContext<MessageServiceContext>({ store: {}, dispatch: null })


export const useMessageServiceValue = <T extends keyof MessageServiceState>(where: T): MessageServiceState[T] => (
  useContextSelector<MessageServiceContext, MessageServiceState[T]>(MessageContext, (store) => store.store[where])
)
/**
 * TODO: типизировать
 */
export const useMessageServiceAction = <T extends MessageActionsKeys>() => (
  useContextSelector<MessageServiceContext, MessageActions[MessageActionsKeys]>(MessageContext, (store) => store.dispatch)
)
