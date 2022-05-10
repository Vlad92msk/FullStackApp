import React from 'react'
import { MessageContext1, useMessageService} from '@client/projects/social/containers/Messages/messageServiceState'


export const MessageContextProvider1: React.FC = ({ children }) => (
  <MessageContext1.Provider value={useMessageService()}>{children}</MessageContext1.Provider>
)
