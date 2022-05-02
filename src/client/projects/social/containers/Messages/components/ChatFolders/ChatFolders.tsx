import React, { useCallback, useState } from 'react'
import lodash from 'lodash'

import { ButtonBox } from '@client_shared/components/ButtonBox'
import { Icon } from '@client_shared/components/Icon'
import { Text } from '@client_shared/components/Text'
import { makeCn } from '@client_shared/utils'
import { FoldersChat } from '../../data/foldersChats'
import styles from './ChatFolders.module.scss'

const cn = makeCn('ChatFolders', styles)

type ChatFoldersProps = {
  folders: FoldersChat[]
  onChoiceFolder: (folderId: number) => void
}
export const ChatFolders: React.FC<ChatFoldersProps> = React.memo((props) => {
  const { folders, onChoiceFolder } = props
  if (!folders) return

  const [choiceFolder, setChoiceFolder] = useState(null)
  const handleChangeFolder = useCallback((folderId: number) => {
    setChoiceFolder(choiceFolder === folderId ? null : folderId)
    onChoiceFolder(choiceFolder === folderId ? null : folderId)
  }, [choiceFolder])

  return (
    <>
      {folders?.map(({ id, name }) => (
        <ButtonBox key={id} className={cn({ active: choiceFolder === id })} onClick={() => handleChangeFolder(id)}>
          <Icon icon={'folder'} size={'small'} fill={'oldAsphalt40'} />
          <Text className={cn('Title', { active: choiceFolder === id })} size={'2'} color={'note'} children={name} />
        </ButtonBox>
      ))}
    </>
  )
}, (a, b) => !Boolean(lodash.xor(a.folders, b.folders).length))
