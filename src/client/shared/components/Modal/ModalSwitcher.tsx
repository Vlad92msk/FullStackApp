import React from 'react'
import { classnames } from '@bem-react/classnames'
import { ButtonBox } from '@shared/components/ButtonBox'
import { Text } from '@shared/components/Text'
import { cn } from './cn'

export type Options = {
  value: string | number
  label: string
}[]

export interface ModalSwitcherProps {
  className?: string
  value?: string | number
  onChange?: (value: string | number) => void
  options: Options
}

export const ModalSwitcher: React.FC<ModalSwitcherProps> = (props) => {
  const { className, value: rootValue, onChange, options } = props

  return (
    <div className={classnames(cn('Switcher'), className)}>
      {options.map(({ value, label }) => (
        <ButtonBox key={value} className={cn('Option', { active: value === rootValue })} onClick={() => onChange(value)}>
          <Text>{label}</Text>
        </ButtonBox>
      ))}
    </div>
  )
}

ModalSwitcher.defaultProps = {
  className: null,
}
