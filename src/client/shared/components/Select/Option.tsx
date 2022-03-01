import React, { useContext } from 'react'
import { classnames } from '@bem-react/classnames'

import { IconName } from '@client_public/models/icon.model'
import { Icon } from '@client_shared/components/Icon'
import { Text } from '@client_shared/components/Text'
import { Checkbox } from '@client_shared/components/Checkbox'
import { OptionValue } from './model'
import { Context } from './Context'
import { cn } from './cn'


export interface OptionProps {
  className?: string
  value: OptionValue
  icon?: IconName
  badge?: number | string
  disabled?: boolean
  hide?: boolean

  children: React.ReactNode
}

export const Option: React.FC<OptionProps> = (props) => {
  const { className, children, value, icon, badge, disabled, hide } = props

  const { selectValue, handleChange, tokenfield, searchValue } = useContext(Context)

  if (
    !new RegExp(searchValue.replace(/\\/g, ''), 'ig').test(children.toString()) ||
    (tokenfield === 'hidden' && Array.isArray(selectValue) && selectValue.includes(value))
  )
    return null

  return (
    <Text
      as="li"
      className={classnames(cn('Option', { active: value === selectValue, disabled, hide }), className)}
      onClick={() => !disabled && handleChange(value)}
      color={disabled ? 'disabled' : 'body'}
    >
      {tokenfield === 'check' && <Checkbox className={cn('OptionCheckbox')} value={Array.isArray(selectValue) && selectValue.includes(value)} />}
      {icon && <Icon className={cn('OptionIcon')} icon={icon} />}
      {children}
      {badge && <span className={cn('OptionBadge')}>{badge}</span>}
    </Text>
  )
}

Option.defaultProps = {
  className: null,
}
