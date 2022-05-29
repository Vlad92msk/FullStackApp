import React, { useEffect } from 'react'
import { useCreateService } from '@client_shared/hooks/useCreateService'
import { Message } from '../../UserMenu/data/messages'
import { Messages } from '../Messages'
import { handlers, HandlersType } from './handlers'
import { ContextServiceMessage } from './context'
import { Reactions, reactions } from './reactions'
import { MessageServiceState, initial } from './'


export const ServiceMessageProvider: React.FC = () => {
  const [dispatch, store] = useCreateService<MessageServiceState, HandlersType, Reactions>({
    handlers,
    reactions,
    initial,
    serviceName: 'Message'
  })

  return (
    <ContextServiceMessage.Provider value={{ store, dispatch }}>
      <Messages />
    </ContextServiceMessage.Provider>
  )
}
