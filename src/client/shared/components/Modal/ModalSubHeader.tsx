import React from 'react'
import { classnames } from '@bem-react/classnames'
import { cn } from './cn'

export interface ModalSubHeaderProps {
  className?: string
  leftChildren?: React.ReactNode | React.ReactNode[]
  rightChildren?: React.ReactNode | React.ReactNode[]
}

export const ModalSubHeader: React.FC<ModalSubHeaderProps> = ({ className, leftChildren, rightChildren }) => {
  return (
    <div className={classnames(cn('SubHeader'), className)}>
      <div>{leftChildren && leftChildren}</div>
      <div>{rightChildren && rightChildren}</div>
    </div>
  )
}

ModalSubHeader.defaultProps = {
  className: null,
}
