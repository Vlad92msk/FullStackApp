import React from 'react'
import { classnames } from '@bem-react/classnames'
import { createString } from '@shared/utils/createString'
import { makeCn } from '../../utils'

import styles from './Image.module.scss'
const cn = makeCn('Image', styles)

export interface ImagePath {
  project?: string
  page?: string
  img: string
}

export interface ImageType {
  path: ImagePath
  sizePriority?: 'width' | 'height' | 'cover'
  className?: string
}

export const Image: React.FC<ImageType> = React.memo(({ path, sizePriority, className }) => {
  const { project, page, img } = path
  const src = `/resources/images/${createString([project, page, img], '/')}`

  return (
    <picture className={cn()}>
      <source type='image/webp' srcSet={`${src}.webp`} />
      <source type='image/avif' srcSet={`${src}.avif`} />
      <img
        src={`${src}.webp`} alt={img}
        style={(
          sizePriority === 'width' ? ({ maxWidth: '100%' }) :
            sizePriority === 'height' ? ({ maxHeight: '100%' }) :
              ({ height: '100%', width: '100%' })
        )}
        className={classnames(cn('Img'), className)}
      />
    </picture>
  )
})

Image.defaultProps = {
  path: {} as ImagePath,
  sizePriority: 'cover'
}
