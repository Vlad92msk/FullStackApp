import React, { forwardRef } from 'react'
import { classnames } from '@bem-react/classnames'
import { motion } from 'framer-motion'

import { createString } from '@client_shared/utils/createString'
import { makeCn } from '@client_shared/utils'

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
}

export const Image: React.FC<ImageType> = forwardRef((props, ref: any) => {
  const { className, sizePriority, path } = props
  const { project, page, img } = path
  const src = `/resources/images/${createString([project, page, img], '/')}`

  return (
    <picture className={cn()}>
      <source type='image/webp' srcSet={`${src}.webp`} />
      <source type='image/avif' srcSet={`${src}.avif`} />
      <img
        ref={ref}
        className={classnames(cn('Img', { sizePriority }), className)}
        src={`${src}.webp`} alt={img}
      />
    </picture>
  )
})

export const MImage = motion(Image)

Image.defaultProps = {
  path: {} as ImagePath,
  sizePriority: 'cover'
}
