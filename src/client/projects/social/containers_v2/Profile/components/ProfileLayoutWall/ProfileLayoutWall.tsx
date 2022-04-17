import React, { useCallback, useRef, useState } from 'react'
import lodash from 'lodash'
import { Picker } from 'emoji-mart'

import { makeCn } from '@client_shared/utils'
import { IconButton } from '@client/shared/components/IconButton'
import { WALL_RECORDS } from '../../data/walls.data'
import { WallRecord } from '../../components'
import { Text } from '@client/shared/components/Text'
import { USER } from '@client/projects/social/containers_v2/App/data/user'
import styles from './ProfileLayoutWall.module.scss'
import { Popup } from '@client/shared/components/Popup'
import { ButtonBox } from '@client/shared/components/ButtonBox'


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
  const [isOpenEmojiPicker, setOpenEmojiPicker] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  const [records, setRecords] = useState(WALL_RECORDS)
  const [newRecord, setNewRecord] = useState<string>(null)

  const handleAddRecord = useCallback(() => {
    setRecords(prev => [{
      ...NEW_RECORD_BASE,
      userId: user.id,
      userName: `${user.name} ${user.family}`,
      userAva: user.img,
      recordText: newRecord
    }, ...prev])
    setNewRecord('')
  }, [newRecord])

  const handleAddEmoji = useCallback((emoji) => {
    console.log('emoji', emoji)
    setNewRecord(prev => prev + emoji.native)
  }, [])

  return (
    <>
      <div className={cn()}>
        <div className={cn('CreateRecord')}>
          <div className={cn('Attach')}>
            <IconButton icon={'attachment'} size={'small'} fill={'oldAsphalt50'} />
          </div>
          <div className={cn('Input')}>
            <Text
              as={'textarea'}
              className={cn('TextInput')}
              onChange={(e) => setNewRecord(e.target.value)}
              value={newRecord}

            />
          </div>
          <div className={cn('Smile')} ref={ref}>
            <IconButton
              icon={'smile'}
              size={'small'}
              fill={'oldAsphalt50'}
              onClick={() => setOpenEmojiPicker(prev => !prev)}
            />
          </div>
        </div>
        <ButtonBox
          className={cn('Send', { disabled: !newRecord?.length })}
          onClick={handleAddRecord}
          disabled={!newRecord?.length}
          children={'Отправить'}
        />
        <div className={cn('Records')}>
          {
            lodash.orderBy(records, 'dateCreated', 'desc').map((record) => (
              <WallRecord key={record.id} record={record} />
            ))
          }
        </div>
      </div>
      <Popup
        anchorEl={ref.current}
        open={isOpenEmojiPicker}
        onClose={() => setOpenEmojiPicker(false)}
      >
        <Picker
          set='apple'
          showPreview={false}
          showSkinTones={false}
          onClick={handleAddEmoji}
        />
      </Popup>
    </>
  )
}
