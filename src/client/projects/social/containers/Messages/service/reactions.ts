import { forIn } from 'lodash'
import { MessageServiceState } from './'

export const reactions = new Map([
  [
    /**
     * На какие экшены реагирует
     */
    ['INJECT__MESSAGE_API', 'SET__NEW_MESSAGE_PUSH'],
    /**
     * Что сделать
     */
    {
      description: 'После получения/отправки сообщения определяет прочитано оно/нет',
      fn: (result: MessageServiceState): MessageServiceState => ({
        ...result,
        newMessages: forIn(result.allMessages, (item) => item.filter(({ dateSeen }) => !Boolean(dateSeen)))
      })
    }
  ]
])

export type Reactions = typeof reactions
