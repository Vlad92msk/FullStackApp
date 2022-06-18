import { FoldersChat } from '../data/foldersChats'
import { DefaultObject } from '@client/public/models/defaultObject.model'
import { Message } from '@client/projects/social/containers/UserMenu/data/messages'
import { Service } from '@client/public/models/service'

export interface FoldersUI extends FoldersChat {
  friends: number[]
  noFriends: number[]
}

export type FoldersUIObject = DefaultObject<FoldersUI>
export interface ServiceState extends Service {
  folders?: FoldersUIObject
  allMessages?: DefaultObject<Message[]>
  newMessages?: DefaultObject<Message[]>
  openFolderId?: number
  openUserIdChat?: number
  search?: string
  pokemons?: any
}


export const initial: ServiceState = {
  folders: {},
  allMessages: {},
  newMessages: {},
  openFolderId: null,
  openUserIdChat: 3,
  search: '',
  pokemons: null
}
