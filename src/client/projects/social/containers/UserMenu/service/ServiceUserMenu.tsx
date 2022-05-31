import React, { useEffect } from 'react'
import { useCreateService } from '@client_shared/hooks/useCreateService'
import { handlersCreator, HandlersType, userMenuActions } from './handlers'
import { ContextService } from './context'
import { Reactions, reactions } from './reactions'
import { UserMenu } from '../UserMenu'
import { ServiceState, initial } from './'
import { USER } from '@client/projects/social/containers/App/data/user'
import { ALL_USERS } from '@client/projects/social/containers/UserMenu/data/all_users'


export const ServiceUserMenu: React.FC = () => {
  const [dispatch, store] = useCreateService<ServiceState, HandlersType, Reactions>({
    handlersCreator,
    reactions,
    initial,
    serviceName: 'UserMenu'
  })

  useEffect(() => {
    dispatch(userMenuActions.INJECT__USER_INFO({
      currentUser: USER,
      allUsers: ALL_USERS
    }))
  }, [])

  return (
    <ContextService.Provider value={{ store, dispatch }}>
      <UserMenu />
    </ContextService.Provider>
  )
}
