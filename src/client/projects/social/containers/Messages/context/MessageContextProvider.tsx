import React from 'react'
import {
  MessageContext, MessageContext1,
  useMessageService
  // useMessageState
} from '@client/projects/social/containers/Messages/messageServiceState'


// export const MessageContextProvider:React.FC = ({ children }) => (
//   <MessageContext.Provider value={useMessageState()}>{children}</MessageContext.Provider>
// );

export const MessageContextProvider1: React.FC = ({ children }) => (
  <MessageContext1.Provider value={useMessageService()}>{children}</MessageContext1.Provider>
)
