import React, { useEffect } from 'react'
import { useCreateService } from '@client_shared/hooks/useCreateService'
import { handlers, HandlersTypeFunc } from './handlers'
import { ContextServiceUserMenu } from './context'
import { Reactions, reactions } from './reactions'
import { UserMenu } from '../UserMenu'
import { UseUserMenuState, initial } from './'



export const ServiceUserMenu: React.FC = () => {
  const [dispatch, store] = useCreateService<UseUserMenuState, HandlersTypeFunc, Reactions>({
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
