import { NextPage } from 'next'
import { storageGet } from '@client/shared/utils'
import { LocalStorageEnum } from '@client/public/models/localStorage'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ServiceState as UserMenuState } from '@client/projects/social/containers/UserMenu/service'
import { ROUTES_ALL } from '@client/projects/routesAll'

const Index: NextPage = () => {
  const user = storageGet<UserMenuState>(LocalStorageEnum.USER_INFO)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router?.push(`${router.asPath}/${user.currenUser.id}`)
    }
    router?.push(`${router.asPath}/${ROUTES_ALL.LOGIN}`)
  }, [user, router])

  return <></>
}

export default Index

