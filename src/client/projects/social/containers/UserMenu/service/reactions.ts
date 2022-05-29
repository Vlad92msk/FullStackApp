import { UseUserMenuState } from './'

export const reactions = new Map([
  [
    /**
     * На какие экшены реагирует
     */
    ['INJECT__USER_INFO'],
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
