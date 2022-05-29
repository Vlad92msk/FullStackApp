import { FoldersChat } from '../data/foldersChats'
import { DefaultObject } from '@client/public/models/defaultObject.model'
import { Message } from '@client/projects/social/containers/UserMenu/data/messages'

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


export const initial: MessageServiceState = {
  folders: {},
  allMessages: {},
  newMessages: {},
  openFolderId: null,
  openUserIdChat: 3,
  search: '',
  pokemons: null
}
