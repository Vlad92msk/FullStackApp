import React, { useCallback, useState, ChangeEvent } from 'react'
import lodash from 'lodash'

export interface AddedFile extends File {
  src: string
}

/**
 * Доступные типы для загрузки
 */
export const AVAILABLE_FILE_TYPES: string[] = [
  'docx',
  'doc',
  'rtf',
  'odt',
  'text/plain',
  'application/rtf',
  'application/doc',
  'application/ms-doc',
  'application/msword',
  'application/excel',
  'application/x-excel',
  'application/x-msexcel',
  'csv',
  'ods',
  'application/pdf',
  'application/mspowerpoint',
  'application/powerpoint',
  'application/vnd.ms-powerpoint',
  'application/x-mspowerpoint',
  'ppt',
  'pptx',
  'pps',
  'ppsx',
  'image/jpeg',
  'image/png',
  'image/bmp',
  'image/gif',
  'image/tiff',
  /**
   * 'audio/mpeg' - mp3
   */
  'audio/mpeg',
  'audio/wav'
]

type MaterialAttachProps = {
  maxFileSize?: number
  availableTypes: string[]
}

type MaterialAttach = [
  AddedFile[],
  (fileInputRef: ChangeEvent<HTMLInputElement>) => void,
  React.Dispatch<React.SetStateAction<AddedFile[]>>
]

export const useMaterialsAttach = (props: MaterialAttachProps = {
  availableTypes: AVAILABLE_FILE_TYPES,
  maxFileSize: 20971520
}): MaterialAttach => {
  const [addedFiles, setAddedFiles] = useState<AddedFile[]>([])

  const handleAddFiles = useCallback((fileInputRef: React.ChangeEvent<HTMLInputElement>) => {
    setAddedFiles([])
    if (!fileInputRef) return
    const currentFiles = fileInputRef.target?.files
    if (!currentFiles) return

    lodash
    .toArray(currentFiles)
    .map((file) => {
      const { type, name, size } = file
      const fileType = type.length ? type : name.slice(name.lastIndexOf('.') + 1)

      if (!props.availableTypes.includes(fileType) || size > props.maxFileSize) return null

      return file
    })
    .filter(Boolean)
    .forEach((file) => {
      const reader = new FileReader()

      reader.onload = (ev) => {
        setAddedFiles(prev => [...prev, {
          lastModified: file.lastModified,
          name: file.name,
          size: file.size,
          type: file.type,
          webkitRelativePath: file.webkitRelativePath,
          // @ts-ignore
          lastModifiedDate: file.lastModifiedDate,
          src: ev.target.result as string,
          ...file
        }])
      }

      reader.readAsDataURL(file)
    })
  }, [props])

  return [addedFiles, handleAddFiles, setAddedFiles]
}
