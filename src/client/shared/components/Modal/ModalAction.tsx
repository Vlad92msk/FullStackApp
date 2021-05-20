import React from 'react'
import { Box, PolymorphicComponentProps } from 'react-polymorphic-box'
import { classnames } from '@bem-react/classnames'

import { cn } from './cn'

export interface ModalActionOwnProps {
  className?: string
  alignedLeft?: boolean
}

export type ModalActionProps<E extends React.ElementType> = PolymorphicComponentProps<E, ModalActionOwnProps>

export const ModalAction = <E extends React.ElementType>(props: ModalActionProps<E>): JSX.Element => {
  const { className, alignedLeft, ...rest } = props

  return <Box as="span" className={classnames(cn('Action', { alignedLeft }), className)} {...rest} />
}

ModalAction.defaultProps = {
  className: null,
  alignedLeft: false,
} as Partial<ModalActionOwnProps>
