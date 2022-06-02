import React from 'react'
import { Box, PolymorphicComponentProps } from 'react-polymorphic-box'
import { classnames } from '@bem-react/classnames'
import { makeCn } from '@client_shared/utils'

import styles from './Text.module.scss'
import { ReferenceObject } from 'popper.js'
const cn = makeCn('Text', styles)


export type TextSize = '05' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'

export interface TextOwnProps {
  size?: TextSize
  weight?: 'regular' | 'medium' | 'bold'
  color?: 'inherit' | 'body' | 'title' | 'note' | 'disabled'
  textTransform?: 'uppercase'
  className?: string
  anchorEl?: React.Ref<any>
}

export type TextProps<E extends React.ElementType> = PolymorphicComponentProps<E, TextOwnProps>

const DEFAULT_ELEMENT = 'span'

export const Text = <E extends React.ElementType = typeof DEFAULT_ELEMENT>(props: TextProps<E>): JSX.Element => {
  const { className, size, weight, color, textTransform, anchorEl, ...rest } = props

  return <Box as={DEFAULT_ELEMENT} ref={anchorEl} className={classnames(cn({ size, weight, color, textTransform }), className)} {...rest} />
}

Text.defaultProps = {
  className: null,
  size: '3',
  weight: 'regular',
  color: 'inherit',
} as Partial<TextOwnProps>
