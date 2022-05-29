import React, { useEffect } from 'react'
import { useCreateService } from '@client_shared/hooks/useCreateService'
import { handlers, HandlersType } from './handlers'
import { ContextServiceUserMenu } from './context'
import { Reactions, reactions } from './reactions'
import { UserMenu } from '../UserMenu'
import { UseUserMenuState, initial } from './'



export const ServiceUserMenuProvider: React.FC = () => {
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
