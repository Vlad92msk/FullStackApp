import { storageGet } from '@client/shared/utils'
import { LocalStorageEnum } from '@client/public/models/localStorage'
import { UserType } from '@client/projects/social/containers/App/data/user'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ROUTES_ALL } from '@client/projects/routesAll'

export const useAuthGuard = () => {
  const user = storageGet<UserType>(LocalStorageEnum.USER_INFO)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push(`/ru/social/${ROUTES_ALL.LOGIN}`)
    }
  }, [user, router])
}
