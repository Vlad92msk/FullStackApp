import React, { useCallback } from 'react'

import { ButtonBox } from '@client_shared/components/ButtonBox'
import { Icon } from '@client_shared/components/Icon'
import { Text } from '@client_shared/components/Text'
import { makeCn } from '@client_shared/utils'
import {
  message$,
  useMessageStateValue,
  useUseMessageStateChange
} from '@client/projects/social/containers/Messages/useMessageState'
import styles from './ChatFolders.module.scss'
import { FoldersChat } from '@client/projects/social/containers/Messages/data/foldersChats'

const cn = makeCn('ChatFolders', styles)

type ChatFoldersProps = {}
export const ChatFolders: React.FC<ChatFoldersProps> = React.memo((props) => {
  const setMessageState = useUseMessageStateChange(message$)
  const openFolderId = useMessageStateValue<number>('openFolderId')
  const folders = useMessageStateValue<FoldersChat[]>('folders')

console.log('2222', openFolderId, folders)
  const handleChangeFolder = useCallback((folderId: number) => {
    setMessageState({
      openFolderId: openFolderId === folderId ? null : folderId
    })
  }, [openFolderId])

  return (
    <>
      {folders?.map(({ id, name }) => (
        <ButtonBox key={id} className={cn({ active: openFolderId === id })} onClick={() => handleChangeFolder(id)}>
          <Icon icon={'folder'} size={'small'} fill={'oldAsphalt40'} />
          <Text className={cn('Title', { active: openFolderId === id })} size={'2'} color={'note'} children={name} />
        </ButtonBox>
      ))}
    </>
  )
})
