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
  icon: IconName
  size?: 'small' | 'ordinary' | 'medium' | 'large'
  fill?: IconFill
}

export type ButtonProps<E extends React.ElementType> = PolymorphicComponentProps<E, ButtonOwnProps>

const DEFAULT_ELEMENT = 'button'

export const IconButton = <E extends React.ElementType = typeof DEFAULT_ELEMENT>(props: ButtonProps<E>): JSX.Element => {
  const { className, classNameIcon, fill, icon, size, ...rest } = props

  return (
    <Box as={DEFAULT_ELEMENT} className={classnames(cn({ size }), className)} {...rest}>
      <Icon className={classnames(cn('Icon'), classNameIcon)} icon={icon} fill={fill} />
    </Box>
  )
}

IconButton.defaultProps = {
  className: null,
  type: 'button',
  size: 'medium',
} as Partial<ButtonOwnProps>
