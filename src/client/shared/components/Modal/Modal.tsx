import React, { useMemo } from 'react'
import { classnames } from '@bem-react/classnames'
import { Icon } from '@shared/components/Icon'
import { Popper } from '@shared/components/Popper'
import { ModalSize, ModalContext } from './model'
import { cn } from './cn'
import { Context } from './Context'

export interface ModalProps {
  children: () => React.ReactNode | React.ReactNode[]
  className?: string
  open: boolean
  size: ModalSize
  autoHeight?: boolean

  onClose?: () => void
  isButtonClose?: boolean
}

export const Modal: React.FC<ModalProps> = (props) => {
  const {
    children,
    className,
    open,
    size,
    autoHeight,

    onClose,
  } = props

  const contextValue = useMemo<ModalContext>(
    () => ({
      size,
    }),
    [size]
  )

  return (
    <Popper open={open} anchorEl={document.body} className={classnames(cn(), className)}>
      <section className={cn('Inner', { size, autoHeight })}>
        {onClose && (
          <span onClick={onClose} className={cn('BlockIconClose')}>
            <Icon icon="close" className={cn('IconClose')} />
          </span>
        )}
        <Context.Provider value={contextValue}>{open && children()}</Context.Provider>
      </section>
    </Popper>
  )
}

Modal.defaultProps = {
  className: null,
  isButtonClose: true,
}
