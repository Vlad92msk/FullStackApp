import React from 'react'
import { makeCn } from '@client_shared/utils'
import { classnames } from '@bem-react/classnames'

import { Text } from '@client_shared/components/Text'
import { scrollToParent } from '@client/shared/utils/scrollToParent'
import { SectionContext } from './Context'
import { SectionType } from './types/sectionType'

import styles from './Section.module.scss'
const cn = makeCn('SectionChange', styles)


export const SectionChange: React.FC<SectionType> = React.memo(({ className, sections, buttonsClassName, type }) => {

  return (
    <div className={classnames(cn({ type }), className)}>
      <div className={classnames(buttonsClassName)}>
        {sections.map(({ name, ref }) => name && <Text key={name} onClick={() => scrollToParent(ref)} children={name} />)}
      </div>

      {sections.map(({ section, ref }) => (
        <SectionContext.Provider value={{ ref }}>
          {section}
        </SectionContext.Provider>)
      )}
    </div>
  )
})

SectionChange.defaultProps = {
  type: 'vertical'
}
