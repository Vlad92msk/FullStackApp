import React from 'react'

import { makeCn } from '@shared/utils'
import styles from './InfoAboutMe.module.scss'
import { AboutMe, MyProjects } from './components'
const cn = makeCn('InfoAboutMe', styles)


export const InfoAboutMe: React.FC = () => {

  return (
    <div className={cn()}>
      <AboutMe />
      <MyProjects />
    </div>
  )
}
