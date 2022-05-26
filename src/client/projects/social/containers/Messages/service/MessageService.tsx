import React from 'react'
import { catchError, from, map, of, pipe, switchMap, tap, withLatestFrom } from 'rxjs'
import { useEventCallback } from 'rxjs-hooks'

import { applyEffects, applyReactions, applyReducer } from '@client_shared/hooks/useObservable'
import { reducer } from '@client_shared/utils/reducer'
import { DefaultObject } from '@client/public/models/defaultObject.model'
import { Message } from '../../UserMenu/data/messages'
import { FoldersChat } from '../../Messages/data/foldersChats'
import { Messages } from '../Messages'
import { handlers } from './handlers'
import { MessageContext } from './context'
import { reactions } from './reactions'


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
  const [dispatch, store] = useEventCallback<any, MessageServiceState>(
    (event$, state$) =>
      event$.pipe(
        withLatestFrom(state$),
        switchMap(([action, state]) => of(action).pipe(
          applyReducer(reducer(handlers), state),
          applyEffects(action),
          applyReactions(action, reactions)
        ))
      ),
    initial
  )

  return (
    <MessageContext.Provider value={{ store, dispatch }}>
      <Messages />
    </MessageContext.Provider>
  )
}
