import React, { ElementType, useCallback } from 'react'
import { classnames } from '@bem-react/classnames'

import { makeCn } from '@client_shared/utils'
import { Text, TextSize } from '@client_shared/components/Text'
import styles from './AreaInput.module.scss'
import { IconName } from '@client/public/models/icon.model'
import { Icon, IconProps } from '@client/shared/components/Icon'


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
  as?: ElementType
  inputClassName?: string
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
    inputClassName
  } = props


  const handleChange = useCallback(({ target: { value: newValue } }) => {
    onChange(newValue, name)
  }, [name])

  return (
    <div className={classnames(cn(), className)} style={{ ...style, alignItems: icon && 'center' }}>
      {icon && (<Icon {...icon} />)}
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
})


AreaInput.defaultProps = {
  className: null,
  placeholder: 'Введите значение...',
  as: 'textarea'
}
