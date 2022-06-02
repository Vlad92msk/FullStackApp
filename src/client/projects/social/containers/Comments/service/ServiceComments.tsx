import React, { useEffect } from 'react'
import { useCreateService } from '@client_shared/hooks/useCreateService'
import { commentsActions, handlersCreator, HandlersType } from './handlers'
import { ContextService } from './context'
import { Reactions, reactions } from './reactions'
import { ServiceState, initial } from './'
import { Comments, CommentsProps } from '../../Comments'
import { COMMENTS } from '../data/comments.data'


interface ServiceCommentsProps {
  serviceName: string
  provideProps: CommentsProps
}

export const ServiceComments: React.FC<ServiceCommentsProps> = (props) => {
  const { serviceName, provideProps } = props
  const [dispatch, store] = useCreateService<ServiceState, HandlersType, Reactions>({
    handlersCreator,
    reactions,
    initial,
    serviceName
  })


  useEffect(() => {
    dispatch(commentsActions.INJECT__COMMENTS({
      comments: COMMENTS
    }))
  }, [])


  return (
    <ContextService.Provider value={{ store, dispatch }}>
      <Comments {...provideProps} />
    </ContextService.Provider>
  )
}
