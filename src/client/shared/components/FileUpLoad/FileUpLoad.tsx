import React, { useCallback, useEffect } from 'react'
import { Icon } from '@client_shared/components/Icon'
import {
  AddedFile,
  AVAILABLE_FILE_TYPES,
  MaterialAttachProps,
  useMaterialsAttach
} from '@client_shared/hooks/useMaterialsAttach'
import { makeCn } from '@client_shared/utils'
import { useBooleanState } from '@client_shared/hooks'
import { Modal } from '@client_shared/components/Modal'
import { Button } from '@client_shared/components/Button'
import { IconButton } from '@client_shared/components/IconButton'
import styles from './FileUpLoad.module.scss'


const cn = makeCn('FileUpLoad', styles)

type FileUpLoadProps = {
  onApply: (files: AddedFile[]) => void
  disabled?: boolean
  availableTypes?: MaterialAttachProps
}

export const FileUpLoad: React.FC<FileUpLoadProps> = (props) => {
  const { onApply, availableTypes, disabled } = props


  const [addedFiles, handleAttach, setAddedFiles] = useMaterialsAttach(availableTypes)

  const removeAttach = useCallback((e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setAddedFiles(prev => prev.filter(({ name }) => name !== e?.currentTarget.name))
  }, [])

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


  const applyAttachments = useCallback(() => {
    onApply(addedFiles)
    setAddedFiles([])
  }, [addedFiles])

  return (
    <>
      <div className={cn()}>
        <label className={cn('AddFile', { disabled })} htmlFor='fileInput'>
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
            accept={availableTypes.availableTypes.join(',')}
            type='file'
          />
        </label>
      </div>
      <Modal className={cn('Modal')} open={isOpenPevFiles} onClose={closePrevFiles}>
        <div className={cn('ApplyAttachments')}>
          {addedFiles.map(({ name, src }) => (
            <div key={name} className={cn('ApplyImg')}>
              <div className={cn('ImgWrapper')}>
                <img className={cn('Img')} src={src} alt={name} />
              </div>
              <IconButton className={cn('CloseApply')} icon={'close'} name={name} onClick={removeAttach} />
            </div>
          ))}
        </div>
        <Button onClick={applyAttachments} styleType={'filled'} color={'blue'}>
          Подтвердить
        </Button>
      </Modal>
    </>
  )
}

FileUpLoad.defaultProps = {
  availableTypes: {
    availableTypes: AVAILABLE_FILE_TYPES,
    maxFileSize: 20971520
  }
}
