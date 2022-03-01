import React from 'react'

import { makeCn } from '@client_shared/utils'
import { AboutMe, MyProjects } from './components'

import styles from './InfoAboutMe.module.scss'
const cn = makeCn('InfoAboutMe', styles)


export const InfoAboutMe: React.FC = () => {

  return (
    <div className={cn()}>
      <AboutMe />
      <MyProjects />
    </div>
  )
}
