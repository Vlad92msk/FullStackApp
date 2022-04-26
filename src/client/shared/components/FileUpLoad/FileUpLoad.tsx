import React, { useCallback, useEffect } from 'react'
import { classnames } from '@bem-react/classnames'

import { createId } from '@server/utils/createId'
import { Icon } from '@client_shared/components/Icon'
import {
  AddedFile,
  availableFormats,
  MaterialAttachProps,
  useMaterialsAttach
} from '@client_shared/hooks/useMaterialsAttach'
import { makeCn } from '@client_shared/utils'
import { useBooleanState } from '@client_shared/hooks'
import { Modal } from '@client_shared/components/Modal'
import { Button } from '@client_shared/components/Button'
import { IconButton } from '@client_shared/components/IconButton'
import { IconName } from '@client/public/models/icon.model'
import styles from './FileUpLoad.module.scss'


const cn = makeCn('FileUpLoad', styles)

type FileUpLoadProps = {
  className?: string
  icon?: IconName
  onApply: (files: AddedFile[]) => void
  disabled?: boolean
  availableTypes?: MaterialAttachProps
  isConfirm?: boolean
}

export const FileUpLoad: React.FC<FileUpLoadProps> = (props) => {
  const { className, icon, onApply, availableTypes, disabled, isConfirm } = props
  const inputId = createId()
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

  /**
   * Если не нужно вызывать модалку с подтверждением - просто добавляет файлы
   */
  useEffect(() => {
    if (!isConfirm && addedFiles.length) {
       setTimeout(() => applyAttachments(), 500)
     }
  }, [isConfirm, addedFiles]);

  return (
    <>
      <div className={classnames(cn(), className)}>
        <label className={cn('AddFile', { disabled })} htmlFor={inputId}>
          <Icon
            icon={icon}
            size={'small'}
            fill={'oldAsphalt50'}
          />
          <input
            className={cn('FileInput')}
            id={inputId}
            onChange={handleAttach}
            multiple={true}
            accept={availableTypes.availableTypes.join(',')}
            type='file'
          />
        </label>
      </div>
      <Modal className={cn('Modal')} open={isOpenPevFiles && isConfirm} onClose={closePrevFiles}>
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
  icon: 'attachment',
  availableTypes: {
    availableTypes: availableFormats,
    maxFileSize: 20971520
  }
}
