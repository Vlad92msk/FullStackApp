import React, { useCallback } from 'react'
import { classnames } from '@bem-react/classnames'

import { makeCn } from '@client_shared/utils'
import { Text, TextSize } from '@client_shared/components/Text'
import styles from './AreaInput.module.scss'


const cn = makeCn('AreaInput', styles)


export interface AreaInputProps {
  className?: string
  style?: React.CSSProperties
  size?: TextSize
  maxWidth?: string
  name?: string
  value?: string
  placeholder?: string
  error?: any
  disabled?: boolean
  onChange?: (value: string, name?: string) => void
  anchorEl?: React.Ref<any>
}


export const AreaInput: React.FunctionComponent<AreaInputProps> = React.memo((props) => {
  const {
    className,
    style,
    size,
    name,
    value,
    placeholder,
    error,
    disabled,
    onChange,
    maxWidth,
    anchorEl
  } = props


  const handleChange = useCallback(({ target: { value: newValue } }) => {
    onChange(newValue, name)
  }, [name])

  return (
    <div className={classnames(cn(), className)} style={style}>
      <Text
        as='textarea'
        anchorEl={anchorEl}
        size={size}
        className={cn('Input')}
        style={{
          maxWidth
        }}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  )
})


AreaInput.defaultProps = {
  className: null,
  placeholder: 'Введите значение...'
}
