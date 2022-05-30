import React from 'react'
import { makeCn } from '@client_shared/utils'

import styles from './NavigationDrawer.module.scss'
import { IconButton } from '@client/shared/components/IconButton'
import { classnames } from '@bem-react/classnames'

const cn = makeCn('NavigationDrawer', styles)

type NavigationDrawerProps = {
  isOpen: boolean
  onClose: () => void
  className?: string
}
export const NavigationDrawer: React.FC<NavigationDrawerProps> = (props) => {
  const { isOpen, onClose, className, children } = props
  return (
    <div
      className={classnames(cn({ status: isOpen ? 'open' : 'close' }), className)}
    >
      <IconButton
        className={cn('Close')}
        icon={'close'}
        onClick={onClose}
      />
      <div className={cn('Content')}>
        {children}
      </div>
    </div>
  )
}
