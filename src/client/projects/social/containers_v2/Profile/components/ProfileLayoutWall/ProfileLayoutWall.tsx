import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import lodash from 'lodash'
import { Picker } from 'emoji-mart'

import { makeCn } from '@client_shared/utils'
import { IconButton } from '@client_shared/components/IconButton'
import { Text } from '@client_shared/components/Text'
import { Popup } from '@client_shared/components/Popup'
import { ButtonBox } from '@client_shared/components/ButtonBox'
import { Icon } from '@client_shared/components/Icon'
import { AVAILABLE_FILE_TYPES, useMaterialsAttach } from '@client_shared/hooks/useMaterialsAttach'
import { Modal } from '@client_shared/components/Modal'
import { useBooleanState } from '@client_shared/hooks'
import { Button } from '@client_shared/components/Button'

import { SliderMedia } from '@client/projects/social/components'
import { USER } from '../../../App/data/user'
import { WallRecord } from '../../components'
import { WALL_RECORDS } from '../../data/walls.data'
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
  const [isOpenEmojiPicker, setOpenEmojiPicker] = useState(false)

  const addEmojiButtonRef = useRef<HTMLDivElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const [records, setRecords] = useState(WALL_RECORDS)
  const [newRecord, setNewRecord] = useState<string>(null)

  const [addedFiles, handleAttach, setAddedFiles] = useMaterialsAttach()

  const handleAddRecord = useCallback(() => {
    setRecords(prev => [{
      ...NEW_RECORD_BASE,
      userId: user.id,
      userName: `${user.name} ${user.family}`,
      userAva: user.img,
      recordText: newRecord,
      attachments: addedFiles
    }, ...prev])

    setNewRecord('')
    setAddedFiles([])
  }, [newRecord, addedFiles, user])


  /**
   * Модалка предпросмотра материалов
   */
  const [isOpenPevFiles, openPrevFiles, closePrevFiles] = useBooleanState(false)
  useEffect(() => {
    if (addedFiles.length) {
      /**
       * Открывает модалку если добавлен материал
       */
      openPrevFiles()
    } else {
      /**
       * Закрывает модалку если не осталось материалов
       */
      closePrevFiles()
    }
  }, [addedFiles])

  /**
   * Добавить смайлик в текст
   */
  const handleAddEmoji = useCallback((emoji) => {
    setNewRecord(prev => {
      /**
       * Позиция курсора в инпуте
       */
      const cursorPosition = textAreaRef?.current?.selectionStart

      const start = prev.substring(0, cursorPosition)
      const end = prev.substring(cursorPosition, prev.length)
      return start + emoji.native + end
    })
  }, [textAreaRef])

  return (
    <>
      <div className={cn()}>
        <div className={cn('CreateRecord')}>
          <div className={cn('Attach')}>
            <label className={cn('AddFile', { disabled: false })} htmlFor='fileInput'>
              <Icon
                icon={'attachment'}
                size={'small'}
                fill={'oldAsphalt50'}
              />
              <input
                className={cn('FileInput')}
                id='fileInput'
                onChange={handleAttach}
                multiple={true}
                accept={AVAILABLE_FILE_TYPES.join(',')}
                type='file'
              />
            </label>
          </div>
          <div className={cn('Input')}>
            <Text
              as={'textarea'}
              anchorEl={textAreaRef}
              className={cn('TextInput')}
              onChange={(e) => setNewRecord(e.target.value)}
              value={newRecord}
            />
          </div>
          <div className={cn('Smile')} ref={addEmojiButtonRef}>
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
        <div style={{
          display: 'flex',
          width: '40vw',
          flexDirection: 'column'
        }}>
        </div>
        <div className={cn('Records')}>
          {
            lodash.orderBy(records, 'dateCreated', 'desc').map((record) => (
              <WallRecord key={record.id} record={record} />
            ))
          }
        </div>
      </div>
      <Popup
        anchorEl={addEmojiButtonRef.current}
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
      <Modal className={cn('Modal')} open={isOpenPevFiles} onClose={closePrevFiles}>
        <SliderMedia height={'50vh'} sliders={addedFiles} />

        <div className={cn('CreateRecord')}>
          <div className={cn('Attach')}>
            <label className={cn('AddFile', { disabled: false })} htmlFor='fileInput'>
              <Icon
                icon={'attachment'}
                size={'small'}
                fill={'oldAsphalt50'}
              />
              <input
                className={cn('FileInput')}
                id='fileInput'
                onChange={handleAttach}
                multiple={true}
                accept={AVAILABLE_FILE_TYPES.join(',')}
                type='file'
              />
            </label>
          </div>
          <div className={cn('Input')}>
            <Text
              as={'textarea'}
              anchorEl={textAreaRef}
              className={cn('TextInput')}
              onChange={(e) => setNewRecord(e.target.value)}
              value={newRecord}
            />
          </div>
          <div className={cn('Smile')} ref={addEmojiButtonRef}>
            <IconButton
              icon={'smile'}
              size={'small'}
              fill={'oldAsphalt50'}
              onClick={() => setOpenEmojiPicker(prev => !prev)}
            />
          </div>
        </div>
        <Button onClick={handleAddRecord} styleType={'filled'} color={'blue'}>
          ADD
        </Button>
      </Modal>
    </>
  )
}
