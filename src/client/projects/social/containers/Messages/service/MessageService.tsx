import React, { useEffect } from 'react'
import { DefaultObject } from '@client/public/models/defaultObject.model'
import { Message } from '../../UserMenu/data/messages'
import { FoldersChat } from '../../Messages/data/foldersChats'
import { Messages } from '../Messages'
import { handlers, HandlersType } from './handlers'
import { MessageContext } from './context'
import { Reactions, reactions } from './reactions'
import { useCreateService } from '@client/shared/hooks/useCreateService'


export interface FoldersUI extends FoldersChat {
  friends: number[]
  noFriends: number[]
}

export type FoldersUIObject = DefaultObject<FoldersUI>
export type MessageServiceState = {
  folders?: FoldersUIObject
  allMessages?: DefaultObject<Message[]>
  newMessages?: DefaultObject<Message[]>
  openFolderId?: number
  openUserIdChat?: number
  search?: string
  pokemons?: any
}


const initial: MessageServiceState = {
  folders: {},
  allMessages: {},
  newMessages: {},
  openFolderId: null,
  openUserIdChat: 3,
  search: '',
  pokemons: null
}


export const MessageService: React.FC = () => {
  const [dispatch, store] = useCreateService<MessageServiceState, HandlersType, Reactions>({
    handlers,
    reactions,
    initial
  })

  return (
    <MessageContext.Provider value={{ store, dispatch }}>
      <Messages />
    </MessageContext.Provider>
  )
}
