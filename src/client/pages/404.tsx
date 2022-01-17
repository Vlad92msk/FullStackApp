import { useContext, useEffect } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Page } from '@shared/components/page'
import { storageGet } from '@shared/utils'
import { Text } from '@shared/components/Text'
import { Button } from '@shared/components/Button'

import { ROUTES_ALL, routesAll } from '~client/projects/routesAll'
import { User } from '~server/lib/connect/users/entitys/user.entity'
import { RoleEnum } from '~client/projects/cosmo/router'
import { DEFAULT_LANGUAGE, ProjectLanguage } from '~client/pages/_app'
import { LocalStorageEnum } from '~public/models/localStorage'


const ErrorPage: NextPage = () => {
  const { back } = useRouter()
  /**
   * Попав на несуществующую страницу - меняем язык на дефолтный
   */
  const { language, setLanguage } = useContext(ProjectLanguage)
  useEffect(() => {
    setLanguage(DEFAULT_LANGUAGE)
  }, [])

  const user: User = storageGet(LocalStorageEnum.USER)

  const allowRoutes = Object.values(routesAll)
  .filter(
    (route) => route.allowRoles.includes(RoleEnum.visitor) ||
      (user && route.allowRoles.some((role) => user.uRoles.includes(role)))
  )
  /**
   * TODO: потом стилизовать
   */
  return (
    <Page page={'ERROR_404'} subTitle={'NotFound'}>
      <Text as={'h1'} size={'5'} children={'Такой страницы не существует'} />
      <Text>
        Вы можете <br />
        <Link href={String(`/${language}/${ROUTES_ALL.PORTFOLIO}`)}>вернуться на главную</Link><br />
        <Button icon={'arrow-left-sharp'} onClick={back}>вернуться на предыдущую страницу</Button><br />
        или выбрать другую страницу для перехода:
      </Text>
      <ul>
        {allowRoutes.map(({ page, title }) => (
          <li key={page} style={{ listStyle: 'none' }}>
            <Link href={String(`/${language}/${page}`)}>
              {title}
            </Link>
          </li>
        ))}
      </ul>

    </Page>
  )
}

export default ErrorPage
