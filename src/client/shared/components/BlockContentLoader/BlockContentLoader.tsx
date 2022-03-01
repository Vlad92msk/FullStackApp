import React from 'react'
import { classnames } from '@bem-react/classnames'
import { makeCn } from '@client_shared/utils'

import styles from './BlockContentLoader.module.scss'
const cn = makeCn('BlockContentLoader', styles)


export interface BlockContentLoaderProps {
  isLoading?: boolean
  className?: string
  size?: 'regular' | 'small'
}

export const BlockContentLoader: React.FC<BlockContentLoaderProps> = (props) => {
  const { isLoading, className, size } = props

  return (
    isLoading && (
      <div className={classnames(cn(), className)}>
        <div className={cn('DotsContainer', { size })}>
          <div className={cn('Dot')} />
          <div className={cn('Dot')} />
          <div className={cn('Dot')} />
          <div className={cn('Dot')} />
          <div className={cn('Dot')} />
          <div className={cn('Dot')} />
          <div className={cn('Dot')} />
          <div className={cn('Dot')} />
        </div>
      </div>
    )
  )
}

BlockContentLoader.defaultProps = {
  className: null,
  size: 'regular',
  isLoading: true,
}
