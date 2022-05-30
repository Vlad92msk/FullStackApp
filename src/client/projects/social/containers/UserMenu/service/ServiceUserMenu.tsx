import React, { useEffect } from 'react'
import { useCreateService } from '@client_shared/hooks/useCreateService'
import { handlers, HandlersTypeFunc, userMenuActions } from './handlers'
import { ContextServiceUserMenu } from './context'
import { Reactions, reactions } from './reactions'
import { UserMenu } from '../UserMenu'
import { UseUserMenuState, initial } from './'
import { USER } from '@client/projects/social/containers/App/data/user'
import { ALL_USERS } from '@client/projects/social/containers/UserMenu/data/all_users'


export const ServiceUserMenu: React.FC = () => {
  const [dispatch, store] = useCreateService<UseUserMenuState, HandlersTypeFunc, Reactions>({
    handlers,
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
    <ContextServiceUserMenu.Provider value={{ store, dispatch }}>
      <UserMenu />
    </ContextServiceUserMenu.Provider>
  )
}
