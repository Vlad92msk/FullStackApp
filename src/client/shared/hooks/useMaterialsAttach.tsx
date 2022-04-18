import React, { useCallback, useMemo, useState } from 'react'
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


export const useMaterialsAttach = (): [AddedFile[], (fileInputRef: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [addedFiles, setAddedFiles] = useState<AddedFile[]>([])

  const handleAddFiles = useCallback((fileInputRef: React.ChangeEvent<HTMLInputElement>) => {
    if (!fileInputRef) return
    const currentFiles = fileInputRef.target?.files
    if (!currentFiles) return

    lodash
    .toArray(currentFiles)
    .map((file) => {
      const { type, name, size } = file
      const fileType = type.length ? type : name.slice(name.lastIndexOf('.') + 1)

      if (!AVAILABLE_FILE_TYPES.includes(fileType) || size > 20971520) return null

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
  }, [])

  return [addedFiles, handleAddFiles]
}
