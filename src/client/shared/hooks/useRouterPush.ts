import { useCallback, useContext } from 'react'
import { useRouter } from 'next/router'
import { ROUTES_ALL } from '@client/projects/routesAll'
import { ProjectLanguage } from '@client/pages/_app'

export const useRouterPush = (path: string) => {
  const router = useRouter()
  const { language } = useContext(ProjectLanguage)

  if (!ROUTES_ALL) return
  return useCallback(() => router.push(`/${language}/${path}`)
  , [language, router])
}
