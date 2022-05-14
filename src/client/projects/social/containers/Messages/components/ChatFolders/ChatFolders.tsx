import React, { useCallback } from 'react'

import { ButtonBox } from '@client_shared/components/ButtonBox'
import { Icon } from '@client_shared/components/Icon'
import { Text } from '@client_shared/components/Text'
import { makeCn } from '@client_shared/utils'
import { useMessageServiceAction, useMessageServiceValue } from '../../service/MessageService'
import { setOpenFolderIdS } from '../../service'
import styles from './ChatFolders.module.scss'


const cn = makeCn('ChatFolders', styles)

type ChatFoldersProps = {}
export const ChatFolders: React.FC<ChatFoldersProps> = React.memo((props) => {

  const openFolderId = useMessageServiceValue('openFolderId')
  const folders = useMessageServiceValue('folders')

  const [_, setOpenFolderId] = useMessageServiceAction<'openFolderId'>(setOpenFolderIdS)

  const handleChangeFolder = useCallback((folderId: number) => {
    setOpenFolderId(openFolderId === folderId ? null : folderId)
  }, [openFolderId])

  return (
    <>
      {Object.values(folders)?.map(({ id, name }) => (
        <ButtonBox key={id} className={cn({ active: openFolderId === id })} onClick={() => handleChangeFolder(id)}>
          <Icon icon={'folder'} size={'small'} fill={'oldAsphalt40'} />
          <Text className={cn('Title', { active: openFolderId === id })} size={'2'} color={'note'} children={name} />
        </ButtonBox>
      ))}
    </>
  )
})
