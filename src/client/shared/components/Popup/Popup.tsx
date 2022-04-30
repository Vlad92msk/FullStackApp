import React from 'react'
import { ClickAwayListener, PopperProps } from '@material-ui/core'
import { Popper } from '@client_shared/components/Popper'
import { makeCn } from '@client_shared/utils'

import styles from './Popup.module.scss'
import { classnames } from '@bem-react/classnames'

export const cn = makeCn('Popup', styles)


export interface PopupProps extends PopperProps {
  children: React.ReactNode | React.ReactNode[]
  onClose?: () => void
  arrow?: boolean
}

export const Popup: React.FC<PopupProps> = React.memo((props) => {
  let { children, onClose, arrow, open, modifiers, anchorEl, className, ...rest } = props

  if (process.browser) {
    document.addEventListener('DOMContentLoaded', () => (anchorEl = document.body))
  }

  return (
    <Popper
      open={open}
      className={cn()}
      modifiers={{
        arrow: { element: '[data-popper-arrow]' },
        ...modifiers
      }}
      {...rest}
      anchorEl={anchorEl}
    >
      <ClickAwayListener onClickAway={onClose}>
        <div className={classnames(className)}>
          {children}
          {arrow && <span data-popper-arrow className={cn('Arrow')} />}
        </div>
      </ClickAwayListener>
    </Popper>
  )
})

Popup.defaultProps = {
  modifiers: {}
}
