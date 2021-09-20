import React from 'react'
import { Box, PolymorphicComponentProps } from 'react-polymorphic-box'
import { classnames } from '@bem-react/classnames'
import { makeCn } from '../../utils'

import styles from './IconButton.module.scss'
import { IconName } from '~public/models/icon.model'
import { Icon, IconFill } from '@shared/components/Icon'

const cn = makeCn('IconButton', styles)

export interface ButtonOwnProps {
  className?: string
  classNameIcon?: string
  classNameIconContainer?: string
  icon: IconName
  size?: 'small' | 'ordinary' | 'medium' | 'large'
  fill?: IconFill
  text?: string
}

export type ButtonProps<E extends React.ElementType> = PolymorphicComponentProps<E, ButtonOwnProps>

const DEFAULT_ELEMENT = 'button'

export const IconButton = <E extends React.ElementType = typeof DEFAULT_ELEMENT>(props: ButtonProps<E>): JSX.Element => {
  const { className, classNameIcon, classNameIconContainer, fill, icon, size, text, ...rest } = props

  return (
    <Box as={DEFAULT_ELEMENT} className={classnames(cn({ size }), className)} {...rest}>
        {text ? (
          <>
            <div className={classnames(cn('IconContainer'), classNameIconContainer)}>
              <Icon className={classnames(cn('IconInContainer'), classNameIcon)} icon={icon} fill={fill} />
            </div>
            <span>{text}</span>
          </>
        ) : <Icon className={classnames(cn('Icon'), classNameIcon)} icon={icon} fill={fill} />}
    </Box>
  )
}

IconButton.defaultProps = {
  className: null,
  type: 'button',
  size: 'medium'
} as Partial<ButtonOwnProps>
