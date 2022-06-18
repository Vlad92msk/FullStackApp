import React, { useEffect } from 'react'
import { storageGet } from '@client_shared/utils'
import { LocalStorageEnum } from '@client/public/models/localStorage'
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
  const userInfo = storageGet(LocalStorageEnum.USER_INFO)
  const [dispatch, store] = useCreateService<ServiceState, HandlersType, Reactions>({
    handlersCreator,
    reactions,
    initial,
    serviceName,
    deps: [Boolean(userInfo)]
  })

  useEffect(() => {
    dispatch(commentsActions.INJECT__ENTITY_ID({
      entityId: provideProps.id
    }))
  }, [provideProps])

  useEffect(() => {
    dispatch(commentsActions.INJECT__COMMENTS({
      comments: COMMENTS
    }))
  }, [])


  return (
    <ContextService.Provider value={{ store, dispatch }}>
      {store.isServiceRunning && (<Comments {...provideProps} />)}
    </ContextService.Provider>
  )
}
