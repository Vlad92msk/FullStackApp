import { GetServerSideProps, NextPage } from 'next'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { storageGet } from '@client/shared/utils'
import { LocalStorageEnum } from '@client/public/models/localStorage'
import { ServiceState as UserMenuState } from '@client/projects/social/containers/UserMenu/service'
import { ROUTES_ALL } from '@client/projects/routesAll'
import { Loader } from '@client/shared/components/Loader'

type Index = {
  resolvedUrl: string
}
const Index: NextPage<Index> = (props) => {
  const user = storageGet<UserMenuState>(LocalStorageEnum.USER_INFO)
  const router = useRouter()

  useEffect(() => {
    if ((props.resolvedUrl && user) && router) {
      router.push(`${props.resolvedUrl}/${user.currenUser.id}/${ROUTES_ALL.SOCIAL_PROFILE}`)
    } else {
      router.push(`${router.asPath}/${ROUTES_ALL.LOGIN}`)
    }

  }, [user, props.resolvedUrl, router])

  return <Loader />

}
export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    resolvedUrl: ctx.resolvedUrl
  }
})

export default Index

