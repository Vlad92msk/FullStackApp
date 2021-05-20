import React, { useContext } from 'react'
import { classnames } from '@bem-react/classnames'
import { cn } from './cn'
import { Context } from './Context'

export interface ModalFooterProps {
  children: React.ReactNode | React.ReactNode[]
  className?: string
}

export const ModalFooter: React.FunctionComponent<ModalFooterProps> = (props) => {
  const { children, className } = props

  const { size } = useContext(Context)
  const isSmallSizeModal = size === 'small'

  return (
    <footer
      className={classnames(
        cn('Footer', {
          withReducedTopPadding: isSmallSizeModal,
          withDivider: !isSmallSizeModal,
        }),
        className
      )}
    >
      {children}
    </footer>
  )
}

ModalFooter.defaultProps = {
  className: null,
}
