import { ServiceState } from './'
import { storageSet } from '@client/shared/utils'
import { LocalStorageEnum } from '@client/public/models/localStorage'

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
      description: 'После получения инф о пользователе - записывает ее в Локал Стор',
      fn: (result: ServiceState): ServiceState => {
        storageSet(LocalStorageEnum.USER_INFO, result)
        return result
      }
    }
  ]
])

export type Reactions = typeof reactions
