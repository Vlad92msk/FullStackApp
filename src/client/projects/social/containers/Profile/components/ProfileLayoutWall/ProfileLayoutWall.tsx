import React, { useCallback, useRef, useState } from 'react'
import lodash from 'lodash'

import { makeCn } from '@client_shared/utils'
import { ButtonBox } from '@client_shared/components/ButtonBox'
import { AreaInput } from '@client_shared/components/AreaInput'
import { FileUpLoad } from '@client_shared/components/FileUpLoad'
import { Text } from '@client_shared/components/Text'
import { InputSmiles } from '@client_shared/components/InputSmiles'
import { USER } from '../../../App/data/user'
import { WallRecord } from '../../components'
import { WALL_RECORDS } from '../../data/walls.data'
import styles from './ProfileLayoutWall.module.scss'
import { Modal } from '@client/shared/components/Modal'


const cn = makeCn('ProfileLayoutWall', styles)

type ProfileLayoutWallType = {
  userId: number
  isWallEdit: unknown
  onCloseWallEditing: () => Promise<boolean>
}

const NEW_RECORD_BASE = {
  id: Math.random(),
  dateCreated: new Date(),
  recordImg: null,
  recordVideo: null,
  commentsCount: null,
  comments: null,
  likesCount: null,
  dislikeCounts: null
}


/**
 * Раздел Профиля - Контент-компонет для Видео или Фото
 */
export const ProfileLayoutWall: React.FC<ProfileLayoutWallType> = React.memo((props) => {
  const { userId, isWallEdit, onCloseWallEditing } = props
  const user = USER
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const [records, setRecords] = useState(WALL_RECORDS)
  const [newRecordText, setNewRecordText1] = useState<string>('')
  const [newRecordFiles, setNewRecordFiles] = useState([])

  const setNewRecordText = useCallback(({value}) => {
    setNewRecordText1(value)
  }, []);

  const handleAddRecord = useCallback(() => {
    setRecords(prev => [{
      ...NEW_RECORD_BASE,
      userId: user.id,
      userName: `${user.name} ${user.family}`,
      userAva: user.img,
      recordText: newRecordText,
      attachments: newRecordFiles
    }, ...prev])

    setNewRecordText('')
    setNewRecordFiles([])
    onCloseWallEditing()
  }, [newRecordText, newRecordFiles, user, onCloseWallEditing])

  return (
    <>
      <div className={cn()}>
        <div className={cn('Records')}>
          {
            lodash.orderBy(records, 'dateCreated', 'desc').map((record) => (
              <WallRecord key={record.id} record={record} />
            ))
          }
        </div>
      </div>
      <Modal className={cn('Modal')} open={Boolean(isWallEdit)} isBckOnClose onClose={onCloseWallEditing}>
        <div className={cn('CreateRecord')}>
          <div className={cn('RecordAdd')}>
            <FileUpLoad onApply={setNewRecordFiles} isConfirm />
            <AreaInput
              anchorEl={textAreaRef}
              value={newRecordText}
              onChange={setNewRecordText}
            />
            <InputSmiles setText={setNewRecordText} textAreaRef={textAreaRef} />
          </div>
          <div className={cn('SendRecord')}>
            {Boolean(newRecordFiles.length) && (
              <Text className={cn('AddedFilesCount')} size={'1'} children={`${newRecordFiles.length} файлов`} />
            )}
            <ButtonBox
              className={cn('Send', { disabled: !newRecordText?.length })}
              onClick={handleAddRecord}
              disabled={!newRecordText?.length}
              children={'Отправить'}
            />
          </div>
        </div>
      </Modal>
    </>
  )
})
