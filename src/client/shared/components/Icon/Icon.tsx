import React from 'react'
import dynamic from 'next/dynamic'
import { classnames } from '@bem-react/classnames'
import { IconName } from '@client_public/models/icon.model'
import { makeCn } from '@client_shared/utils'
import { BlockContentLoader } from '../BlockContentLoader'
const cn = makeCn('Icon', styles)
import styles from './Icon.module.scss'

export type IconFill = 'oldAsphalt50' | 'oldAsphalt40' | 'bluePrimrose50' | 'light100' | 'redRose40'

export interface IconProps {
  className?: string
  icon: IconName
  fill?: IconFill
  size?: 'small' | 'ordinary' | 'medium' | 'large'
  onClick?: () => void
  onMouseEnter?: (e: React.MouseEvent) => void
  onMouseLeave?: (e: React.MouseEvent) => void
}

export const Icon: React.FunctionComponent<IconProps> = ({ className, icon, fill, size, onClick, onMouseEnter, onMouseLeave }) => {
  if (typeof window !== 'undefined')  {
    const DynamicComponent = dynamic(() => import(`../../../public/resources/icons/${icon}.svg`), {
      ssr: false,
    })

    DynamicComponent.defaultProps = {
      className: classnames(cn({ fill, size }), className),
      onClick,
      onMouseEnter,
      onMouseLeave,
    }

    return <DynamicComponent />
  }

  return <BlockContentLoader />
}
