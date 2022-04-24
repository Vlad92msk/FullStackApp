import React, { useCallback, useState } from 'react'
import lodash from 'lodash'

import { makeCn } from '@client_shared/utils'
import { ButtonBox } from '@client_shared/components/ButtonBox'

import { USER } from '../../../App/data/user'
import { WallRecord } from '../../components'
import { WALL_RECORDS } from '../../data/walls.data'
import { AreaInput } from '@client/shared/components/AreaInput'
import { FileUpLoad } from '@client/shared/components/FileUpLoad'
import { Text } from '@client/shared/components/Text'
import styles from './ProfileLayoutWall.module.scss'


const cn = makeCn('ProfileLayoutWall', styles)

type ProfileLayoutWallType = {
  userId: number
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
export const ProfileLayoutWall: React.FC<ProfileLayoutWallType> = (props) => {
  const { userId } = props
  const user = USER

  const [records, setRecords] = useState(WALL_RECORDS)
  const [newRecordText, setNewRecordText] = useState<string>('')
  const [newRecordFiles, setNewRecordFiles] = useState([])

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
  }, [newRecordText, newRecordFiles, user])

  return (
    <>
      <div className={cn()}>
        <div className={cn('CreateRecord')}>
          <div className={cn('RecordAdd')}>
            <FileUpLoad onApply={setNewRecordFiles} />
            <AreaInput
              withSmiles={true}
              value={newRecordText}
              onChange={setNewRecordText}
              isCompleted={Boolean(!newRecordText.length)}
            />
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
        <div className={cn('Records')}>
          {
            lodash.orderBy(records, 'dateCreated', 'desc').map((record) => (
              <WallRecord key={record.id} record={record} />
            ))
          }
        </div>
      </div>
    </>
  )
}
