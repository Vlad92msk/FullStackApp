import React from 'react'
import { classnames } from '@bem-react/classnames'
import { makeCn } from '@client_shared/utils'

import styles from './FieldRow.module.scss'
const cn = makeCn('FieldRow', styles)

export interface FieldRowProps {
  children: React.ReactNode | React.ReactNode[]
  className?: string
  align?: 'top' | 'bottom' | 'center'
  justify?: 'start' | 'center' | 'between' | 'around' | 'end'
  wrap?: 'wrap' | 'nowrap'
  width?: '100' | '50' | '25'
  direction?: 'row' | 'column' | 'columnreverse' | 'rowreverse'
  style?: React.CSSProperties
}

export const FieldRow: React.FunctionComponent<FieldRowProps> = (props) => {
  const { children, className, align, justify, wrap, width, direction, style } = props

  return (
    <div
      style={style}
      className={classnames(
        cn({
          align,
          justify,
          wrap,
          width,
          direction,
        }),
        className
      )}
    >
      {children}
    </div>
  )
}

FieldRow.defaultProps = {
  className: null,
  align: 'top',
  justify: 'start',
  wrap: 'nowrap',
  direction: 'row',
}
