import React from 'react'
import { MessageContext, useMessageState } from '@client/projects/social/containers/Messages/useMessageState'


export const MessageContextProvider:React.FC = ({ children }) => (
  <MessageContext.Provider value={useMessageState()}>{children}</MessageContext.Provider>
);
