import React from 'react'
import { classnames } from '@bem-react/classnames'
import { cn } from './cn'

export interface ModalBodyProps {
  children: React.ReactNode | React.ReactNode[]
  className?: string
  lightBackgroundColor?: boolean
  noPadding?: boolean
}

export const ModalBody: React.FunctionComponent<ModalBodyProps> = (props) => {
  const { children, className, lightBackgroundColor, noPadding } = props

  return (
    <div
      className={classnames(
        cn('Body', {
          withLightBackgroundColor: lightBackgroundColor,
          withNoPadding: noPadding,
        }),
        className
      )}
    >
      {children}
    </div>
  )
}

ModalBody.defaultProps = {
  className: null,
  lightBackgroundColor: false,
  noPadding: false,
}
