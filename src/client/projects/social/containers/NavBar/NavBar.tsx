import React from 'react'

import { makeCn } from '@client_shared/utils'
import { Button } from '@client_shared/components/Button'
import { MenuListItem, MenuListWithButton } from '@client_shared/components/MenuList'
import { Icon } from '@client_shared/components/Icon'
import { Text } from '@client_shared/components/Text'
import styles from './NavBar.module.scss'
import { ButtonBox } from '@client/shared/components/ButtonBox'

const cn = makeCn('NavBar', styles)


export const NavBar: React.FC = React.memo(() => {
  return (
    <section className={cn()}>
      <div className={cn('Header')}>
        <div className={cn('Title')}>Title</div>
        <MenuListWithButton classNameButton={cn('Button')}>
          <MenuListItem>
            swd
          </MenuListItem>
          <MenuListItem>
            swd
          </MenuListItem>
        </MenuListWithButton>
      </div>
      <nav className={cn('Nav')}>
        <ul>
          <li>
            <ButtonBox onClick={() => console.log('1', 1)}>
              <Icon className={cn('Icon')} size={'ordinary'} icon={'photo'} />
              <Text className={cn('Text')} children={'Фото'} />
            </ButtonBox>
          </li>
          <li>
            <ButtonBox onClick={() => console.log('1', 1)}>
              <Icon className={cn('Icon')} size={'ordinary'} icon={'video'} />
              <Text className={cn('Text')} children={'Видео'} />
            </ButtonBox>
          </li>
          <li>
            <ButtonBox onClick={() => console.log('1', 1)}>
              <Icon className={cn('Icon')} size={'ordinary'} icon={'groups'} />
              <Text className={cn('Text')} children={'Группы'} />
            </ButtonBox>
          </li>
          <li>
            <ButtonBox onClick={() => console.log('1', 1)}>
              <Icon className={cn('Icon')} size={'ordinary'} icon={'music'} />
              <Text className={cn('Text')} children={'Музыка'} />
            </ButtonBox>
          </li>
        </ul>
      </nav>
    </section>
  )
})
