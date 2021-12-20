import React from 'react'
import { VideoContent, Articles } from './components'
import { Section } from '@shared/components/Section'
import { makeCn } from '@shared/utils'

import styles from './Body.module.scss'
const cn = makeCn('Body', styles)

export const Body: React.FC = () => {
  return (
    <Section className={cn()}>
      <VideoContent />
      <Articles />
    </Section>
  )
}
