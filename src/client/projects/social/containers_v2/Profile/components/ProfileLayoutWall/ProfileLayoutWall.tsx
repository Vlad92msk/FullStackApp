import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import lodash from 'lodash'
import { Picker } from 'emoji-mart'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper/core'

import { makeCn } from '@client_shared/utils'
import { IconButton } from '@client/shared/components/IconButton'
import { Text } from '@client/shared/components/Text'
import { USER } from '@client/projects/social/containers_v2/App/data/user'
import { Popup } from '@client/shared/components/Popup'
import { ButtonBox } from '@client/shared/components/ButtonBox'
import { WallRecord } from '../../components'
import { WALL_RECORDS } from '../../data/walls.data'
import { Icon } from '@client/shared/components/Icon'
import {
  AVAILABLE_FILE_TYPES, useMaterialsAttach
} from '@client/shared/hooks/useMaterialsAttach'
import styles from './ProfileLayoutWall.module.scss'
import { Modal } from '@client/shared/components/Modal'
import { useBooleanState } from '@client/shared/hooks'

SwiperCore.use([Pagination])

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


  const [addedFiles, handleAttach, setAddedFiles] = useMaterialsAttach()

  const attachments = useMemo(() => {
    return addedFiles.map(({ name, src }) => (
      <SwiperSlide
        className={cn('Slide')}
        key={name}
        id={name}
      >
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}>
          <img style={{
            position: 'absolute',
            objectFit: 'contain',
            width: '100%',
            height: '100%',
          }} src={src} alt={name} />
          <IconButton
            style={{
              position: 'absolute',
              right: '20px',
              top: 0
            }}
            icon={'close'}
            onClick={() => setAddedFiles(addedFiles.filter(({ name: attachName }) => attachName !== name))}
          />
        </div>
      </SwiperSlide>

    ))
  }, [addedFiles])

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
      <Modal open={isOpenPevFiles} onClose={closePrevFiles} >
        <Swiper
          className={cn('Slider')}
          pagination={{
            dynamicBullets: true,
          }}
        >
          {attachments}
        </Swiper>
      </Modal>
    </>
  )
}
