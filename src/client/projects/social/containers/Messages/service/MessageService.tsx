import React, { useCallback, useState } from 'react'
import { distinct, distinctUntilChanged, filter, of, shareReplay, switchMap, tap, withLatestFrom } from 'rxjs'
import { useObservableState } from 'observable-hooks'

import { distinctUntilPropertyChanged, createReducer } from '@client_shared/hooks/useObservable'
import { reducer } from '@client_shared/utils/reducer'
import { DefaultObject } from '@client/public/models/defaultObject.model'
import { Message } from '../../UserMenu/data/messages'
import { FoldersChat } from '../../Messages/data/foldersChats'
import { Messages } from '../Messages'
import { handlers } from './handlers'
import { MessageContext } from './context'
import { useEventCallback } from 'rxjs-hooks'


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
}


const initial: MessageServiceState = {
  folders: {},
  allMessages: {},
  newMessages: {},
  openFolderId: null,
  openUserIdChat: 3,
  search: ''
}


export const MessageService: React.FC = () => {
  const [dispatch, store] = useEventCallback(
    (event$, state$) =>
      event$.pipe(
        withLatestFrom(state$),
        switchMap(([action, state]) => of(action).pipe(
          createReducer(reducer(handlers), state),
        ))
      ),
    initial
  );

  return (
    <MessageContext.Provider value={{ store, dispatch }}>
      <Messages />
    </MessageContext.Provider>
  )
}
