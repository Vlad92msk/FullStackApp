import React, { useEffect } from 'react'
import { useCreateService } from '@client_shared/hooks/useCreateService'
import { storageGet } from '@client_shared/utils'
import { LocalStorageEnum } from '@client/public/models/localStorage'
import { ServiceState as UserMenuState } from '@client/projects/social/containers/UserMenu/service'
import { Message } from '../../UserMenu/data/messages'
import { Messages } from '../Messages'
import { handlersCreator, HandlersType, messageActions } from './handlers'
import { ContextService } from './context'
import { Reactions, reactions } from './reactions'
import { ServiceState, initial } from './'
import { MESSAGES } from '@client/projects/social/containers/Messages/data/messages'
import { USER } from '@client/projects/social/containers/App/data/user'
import { FOLDERS_CHATS } from '@client/projects/social/containers/Messages/data/foldersChats'



export const ServiceMessage: React.FC = () => {
  const userInfo = storageGet(LocalStorageEnum.USER_INFO) as UserMenuState
  const [dispatch, store] = useCreateService<ServiceState, HandlersType, Reactions>({
    handlersCreator,
    reactions,
    initial,
    serviceName: 'Message',
    deps: [Boolean(userInfo)]
  })
  useEffect(() => {
    dispatch(messageActions.INJECT__MESSAGE_API({
      allMessages: MESSAGES,
    }))
  }, [MESSAGES])

  useEffect(() => {
    if (USER?.friends.length) {
     dispatch(messageActions.INJECT__FOLDERS_API({
        folders: FOLDERS_CHATS,
      }))
    }
  }, [FOLDERS_CHATS])

  return (
    <ContextService.Provider value={{ store, dispatch }}>
      {store.isServiceRunning && (<Messages />)}
    </ContextService.Provider>
  )
}
