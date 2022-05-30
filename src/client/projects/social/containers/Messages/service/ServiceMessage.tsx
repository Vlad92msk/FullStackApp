import React, { useEffect } from 'react'
import { useCreateService } from '@client_shared/hooks/useCreateService'
import { Message } from '../../UserMenu/data/messages'
import { Messages } from '../Messages'
import { handlers, HandlersTypeFunc, messageActions } from './handlers'
import { ContextServiceMessage } from './context'
import { Reactions, reactions } from './reactions'
import { MessageServiceState, initial } from './'
import { MESSAGES } from '@client/projects/social/containers/Messages/data/messages'
import { USER } from '@client/projects/social/containers/App/data/user'
import { FOLDERS_CHATS } from '@client/projects/social/containers/Messages/data/foldersChats'


export const ServiceMessage: React.FC = () => {
  const [dispatch, store] = useCreateService<MessageServiceState, HandlersTypeFunc, Reactions>({
    handlers,
    reactions,
    initial,
    serviceName: 'Message'
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
    <ContextServiceMessage.Provider value={{ store, dispatch }}>
      <Messages />
    </ContextServiceMessage.Provider>
  )
}
