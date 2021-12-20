import React from 'react'
import { makeCn } from '@shared/utils'
import styles from './Section.module.scss'
import { classnames } from '@bem-react/classnames'

const cn = makeCn('Base', styles)

type SectionType = {
  className?: string
  bcgImg?: {
    project: string
    imgName: string
  }
  noPaddingLeft?: boolean
  noPaddingRight?: boolean
  noPaddingTop?: boolean
  noPaddingBottom?: boolean
}
export const Section: React.FC<SectionType> = React.memo((
  { bcgImg, className, noPaddingLeft, noPaddingRight, noPaddingTop, noPaddingBottom, children }
) => {
  const paddingLeft = noPaddingLeft && { paddingLeft: 0 }
  const paddingRight = noPaddingRight && { paddingRight: 0 }
  const paddingTop = noPaddingTop && { paddingTop: 0 }
  const paddingBottom = noPaddingBottom && { paddingBottom: 0 }

  return (
    <section
      className={classnames(cn(), className)}
      style={{ ...paddingLeft, ...paddingRight, ...paddingTop, ...paddingBottom }}
    >
      {bcgImg && <img className={cn('Img')} src={`/resources/images/${bcgImg.project}/${bcgImg.imgName}`} alt='' />}
      {children}
    </section>
  )
})
