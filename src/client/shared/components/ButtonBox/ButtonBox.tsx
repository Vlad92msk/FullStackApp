import React, { forwardRef } from 'react'
import { Box, PolymorphicComponentProps } from 'react-polymorphic-box'
import { classnames } from '@bem-react/classnames'
import { motion } from 'framer-motion'

import { makeCn } from '@client_shared/utils'

import styles from './ButtonBox.module.scss'

const cn = makeCn('ButtonBox', styles)

export interface ButtonBoxOwnProps {
  className?: string
}

export type ButtonBoxProps<E extends React.ElementType> = PolymorphicComponentProps<E, ButtonBoxOwnProps>

const DEFAULT_ELEMENT = 'button'

export const ButtonBox = forwardRef(
  <E extends React.ElementType = typeof DEFAULT_ELEMENT>(props: ButtonBoxProps<E>, ref): JSX.Element => {
    const { className, children, ...rest } = props

    return (
      <Box ref={ref} as={DEFAULT_ELEMENT} type='button' className={classnames(cn(), className)} {...rest}>
        {children}
      </Box>
    )
  })

ButtonBox.defaultProps = {
  className: null
}

export const MButtonBox = motion(ButtonBox)
