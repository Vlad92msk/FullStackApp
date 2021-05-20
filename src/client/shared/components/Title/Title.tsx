import React from 'react'
import { Box, PolymorphicComponentProps } from 'react-polymorphic-box'
import { classnames } from '@bem-react/classnames'
import { makeCn } from '@shared/utils'
import styles from './Title.module.scss'

const cn = makeCn('Title', styles)

export interface TitleOwnProps {
  className?: string
  size: '1' | '2' | '3' | '4' | '5' | '6'
  noMargin?: boolean
}

export type TitleProps<E extends React.ElementType> = PolymorphicComponentProps<E, TitleOwnProps>

export const Title = <E extends React.ElementType>(props: TitleProps<E>): JSX.Element => {
  const { className, as: asElement, size, noMargin, ...rest } = props

  const headingElement: E | string | any = asElement || `h${size}`

  return <Box as={headingElement} className={classnames(cn({ size, noMargin }), className)} {...rest} />
}

Title.defaultProps = {
  noMargin: false,
}
