import React from 'react'
import { Box, PolymorphicComponentProps } from 'react-polymorphic-box'
import { classnames } from '@bem-react/classnames'

import { makeCn } from '@client_shared/utils'
import { Text, TextSize } from '@client_shared/components/Text'
import { Icon } from '@client_shared/components/Icon'

import styles from './Field.module.scss'
const cn = makeCn('Field', styles)


export interface FieldOwnProps {
  className?: string
  style?: React.CSSProperties
  label?: string
  required?: boolean
  error?: string
  labelPosition?: 'top' | 'right' | 'left'
  labelColor?: 'inherit' | 'body' | 'title' | 'note' | 'disabled'
  labelSize?: TextSize
  isDiv?: boolean
  autoWidth?: boolean
}

export type FieldProps<E extends React.ElementType> = PolymorphicComponentProps<E, FieldOwnProps>

const DEFAULT_ELEMENT = 'input'

export const Field = <E extends React.ElementType = typeof DEFAULT_ELEMENT>(props: FieldProps<E>): JSX.Element => {
  const { className, style, label, labelColor, labelSize, required, error, labelPosition, isDiv, autoWidth, ...rest } = props

  return (
    <div className={classnames(cn({ autoWidth }), className)} style={style}>
      <Box as={isDiv ? 'div' : 'label'} className={cn('InputContainer', { labelPosition })}>
        <Text className={cn('Label', { labelPosition })} color={labelColor} size={labelSize}>
          {label}
          {label && required && <Icon className={cn('RequiredIcon')} icon="required-field-marker" />}
        </Text>
        <Box as={DEFAULT_ELEMENT} error={error} {...rest} />
      </Box>

      {error && <Text className={cn('Message')}>{error}</Text>}
    </div>
  )
}

Field.defaultProps = {
  className: null,
  required: false,
  error: null,
  labelPosition: 'top',
} as Partial<FieldOwnProps>
