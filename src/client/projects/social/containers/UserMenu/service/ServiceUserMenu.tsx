import React, { useEffect } from 'react'
import { useCreateService } from '@client/shared/hooks/useCreateService'
import { handlers, HandlersType } from './handlers'
import { ContextServiceUserMenu } from './context'
import { Reactions, reactions } from './reactions'
import { UserType } from '../../App/data/user'
import { UserMenu } from '../UserMenu'


export type UseUserMenuState = {
  friends?: UserType[]
  possibleFriends?: UserType[]
  currenUser?: UserType
  notification?: any
  hashes?: any
}

const initial: UseUserMenuState = {
  friends: [],
  possibleFriends: [],
  currenUser: null,
  notification: null,
  hashes: null
}


export const ServiceUserMenu: React.FC = () => {
  const [dispatch, store] = useCreateService<UseUserMenuState, HandlersType, Reactions>({
    handlers,
    reactions,
    initial,
    serviceName: 'UserMenu'
  })

  return (
    <ContextServiceUserMenu.Provider value={{ store, dispatch }}>
      <UserMenu />
    </ContextServiceUserMenu.Provider>
  )
}
