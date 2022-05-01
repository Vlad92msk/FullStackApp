import React, { ElementType, useCallback, useEffect, useState } from 'react'
import { classnames } from '@bem-react/classnames'

import { makeCn } from '@client_shared/utils'
import { Text, TextSize } from '@client_shared/components/Text'
import { Icon, IconProps } from '@client/shared/components/Icon'
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
  icon?: IconProps
  iconClear?: IconProps
  as?: ElementType
  inputClassName?: string
  onIconClear?: () => void
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
    anchorEl,
    icon,
    as,
    inputClassName,
    iconClear,
    onIconClear,
  } = props

  const handleChange = useCallback(({ target: { value: newValue } }) => {
      onChange(newValue, name)
  }, [name, onChange])

  return (
    <div className={classnames(cn(), className)} style={{ ...style, alignItems: icon && 'center' }}>
      {icon && (<Icon {...icon} />)}
      {(iconClear && value?.length) ? (<Icon className={cn('IconClear')} {...iconClear} onClick={onIconClear} />) : null}
      <Text
        as={as}
        anchorEl={anchorEl}
        size={size}
        className={classnames(cn('Input'), inputClassName)}
        style={{
          maxWidth,
          marginLeft: icon && '5px'
        }}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  )
}, (a, b) => a.value === b.value)


AreaInput.defaultProps = {
  className: null,
  placeholder: 'Введите значение...',
  as: 'textarea'
}
