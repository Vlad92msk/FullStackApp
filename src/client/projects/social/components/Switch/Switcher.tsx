import React from 'react'
import { SwitcherElement, SwitcherOption } from '@client/projects/social/components'
import { cn } from './cn'

export type SwitcherType = {
  options: SwitcherElement[]
  currentValue: any
  onChange: (id: any) => void
}

export const Switcher: React.FC<SwitcherType> = React.memo((props) => {
  const { options, currentValue, onChange } = props

  return (
    <div className={cn('Switcher')}>
      {options.map((option) => (
        <SwitcherOption
          key={option.value}
          onChange={onChange}
          currentValue={currentValue}
          switcher={option}
        />
      ))}
    </div>
  )
})
