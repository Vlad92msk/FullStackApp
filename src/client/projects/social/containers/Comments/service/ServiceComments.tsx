import React from 'react'
import { useCreateService } from '@client_shared/hooks/useCreateService'
import { Message } from '../../UserMenu/data/messages'
import { handlersCreator, HandlersType } from './handlers'
import { ContextService } from './context'
import { Reactions, reactions } from './reactions'
import { ServiceState, initial } from './'
import { Comments, CommentsProps } from '../../Comments'


interface ServiceCommentsProps extends CommentsProps {
}

export const ServiceComments: React.FC<ServiceCommentsProps> = (props) => {
  const [dispatch, store] = useCreateService<ServiceState, HandlersType, Reactions>({
    handlersCreator,
    reactions,
    initial,
    serviceName: 'Message'
  })


  return (
    <ContextService.Provider value={{ store, dispatch }}>
      <Comments {...props} />
    </ContextService.Provider>
  )
}
