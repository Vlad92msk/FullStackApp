import React from 'react'

import { Section } from '@client_shared/components/Section'
import { makeCn } from '@client_shared/utils'
import { VideoContent, Articles } from './components'

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
