import { ServiceState } from './'

export const reactions = new Map([
  [
    /**
     * На какие экшены реагирует
     */
    ['ANY'],
    /**
     * Что сделать
     */
    {
      description: 'После получения/отправки сообщения определяет прочитано оно/нет',
      fn: (result: ServiceState): ServiceState => ({
        ...result,
      })
    }
  ]
])

export type Reactions = typeof reactions
