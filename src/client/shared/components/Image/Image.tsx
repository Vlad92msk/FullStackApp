import React, { forwardRef, useMemo, useState } from 'react'
import { classnames } from '@bem-react/classnames'
import { motion } from 'framer-motion'

import { createString } from '@client_shared/utils/createString'
import { makeCn } from '@client_shared/utils'
import { Modal } from '@client_shared/components/Modal'
import { useToggle } from '@client_shared/hooks'
import styles from './Image.module.scss'

const cn = makeCn('Image', styles)


export interface ImagePath {
  project?: string
  page?: string
  img: string
}

export interface ImageType {
  path: ImagePath
  sizePriority?: 'width' | 'height' | 'cover' | 'contain'
  className?: string
  isOpenFullScreen?: boolean
  withOptimized?: boolean
}

export const Image: React.FC<ImageType> = forwardRef((props, ref: any) => {
  const { className, sizePriority, path, isOpenFullScreen, withOptimized } = props
  const { project, page, img } = path
  const src = `/resources/images/${createString([project, page, img], '/')}`

  const [isOpen, setOpen] = useToggle()

  /**
   * TODO: withOptimized - временное решение, ак будет конвертация в avif и webp на бэке - убрать этот параметр
   */
  const picture = useMemo(() => (
    withOptimized ? (
      <picture className={cn()}>
        <source type='image/webp' srcSet={`${src}.webp`} />
        <source type='image/avif' srcSet={`${src}.avif`} />
        <img
          ref={ref}
          className={classnames(cn('Img', { sizePriority }), className)}
          onClick={setOpen}
          src={`${src}.webp`}
          alt={img}
        />
      </picture>
    ) : (
      <img
        ref={ref}
        className={classnames(cn('Img', { sizePriority }), className)}
        onClick={setOpen}
        src={img}
        alt={img}
      />
    )
  ), [sizePriority, className, project, page, img, withOptimized])

  return (
    <>
      {picture}
      {
        isOpenFullScreen && (
          <Modal className={cn('Modal')} open={isOpen} onClose={setOpen}>
            <div className={cn('ModalImgContainer')}>
              {picture}
            </div>
          </Modal>
        )
      }
    </>
  )
})

export const MImage = motion(Image)

Image.defaultProps = {
  path: {} as ImagePath,
  sizePriority: 'cover',
  withOptimized: true
}
