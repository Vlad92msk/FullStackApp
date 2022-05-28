import { UseUserMenuState } from './ServiceUserMenu'

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
      fn: (result: UseUserMenuState): UseUserMenuState => ({
        ...result,
      })
    }
  ]
])

export type Reactions = typeof reactions
