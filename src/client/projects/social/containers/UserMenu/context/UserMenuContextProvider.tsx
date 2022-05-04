import React from 'react'
import { UserMenuContext, useUserMenuState } from '@client/projects/social/containers/UserMenu/useUserMenuState'


export const UserMenuContextProvider:React.FC = ({ children }) => (
  <UserMenuContext.Provider value={useUserMenuState()}>{children}</UserMenuContext.Provider>
);
