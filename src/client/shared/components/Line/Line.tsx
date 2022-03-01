import React from 'react'
import { makeCn } from '@client_shared/utils'

import styles from './Line.module.scss'
const cn = makeCn('Line', styles)


export interface LineProps {
  marginTop?: number | string
  marginBottom?: number | string
}

export const Line: React.FC<LineProps> = ({ marginTop, marginBottom }) => {
  return <div className={cn()} style={{ marginTop, marginBottom }} />
}
