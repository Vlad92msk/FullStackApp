import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Page } from '@shared/components/page'
import { Text } from '@shared/components/Text'
import { Button } from '@shared/components/Button'
import { routesAll } from '~client/projects/routesAll'
import { User } from '~server/lib/connect/users/entitys/user.entity'
import { storageGet } from '@shared/utils'
import { LocalStorageEnum } from '~public/models/localStorage'
import { RoleEnum } from '~client/projects/cosmo/router'

const ErrorPage: NextPage = () => {
  const { back } = useRouter()
  const user: User = storageGet(LocalStorageEnum.USER)

  const allowRoutes = Object.values(routesAll)
  .filter(
    (route) => route.allowRoles.includes(RoleEnum.visitor) ||
      (user && route.allowRoles.some((role) => user.uRoles.includes(role)))
  )
  /**
   * TODO: потом стилизовать
   */
  return (<Page page={'ERROR_404'} subTitle={'NotFound'}>
    <Text as={'h1'} size={'5'} children={'Такой страницы не существует'} />
    <Text>
      Вы можете <br />
      <Link href={'/'}>вернуться на главную</Link><br />
      <Button icon={'arrow-left-sharp'} onClick={back}>вернуться на предыдущую страницу</Button><br />
      или выбрать другую страницу для перехода:
    </Text>
    <ul inlist>
      {allowRoutes.map(({ page, title }) => <li style={{'listStyle': 'none'}} key={page}><Link href={page}>{title}</Link></li>)}
    </ul>

  </Page>)
}

export default ErrorPage
