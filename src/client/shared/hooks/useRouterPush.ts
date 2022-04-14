import { useCallback, useContext } from 'react'
import { useRouter } from 'next/router'
import { ParsedUrlQueryInput } from 'querystring'
import { ROUTES_ALL } from '@client/projects/routesAll'
import { ProjectLanguage } from '@client/pages/_app'

/**
 * Заменяет один параметр в URL на другой
 * @param pathname
 * @param oldParam
 * @param newParam
 * @param value
 */
export const replaceUrl = (pathname: string, oldParam: string, newParam: string, value: string): [string, ParsedUrlQueryInput] => {
  const path = pathname.replace('/' + oldParam, `/[${newParam}]`)
  return ([path, { [newParam]: value }])
}

export const useRouterPush = (path: string, query?: ParsedUrlQueryInput) => useCallback(() => {
    const router = useRouter()
    const { language } = useContext(ProjectLanguage)
    if (!ROUTES_ALL) return

    /**
     * TODO: добавить потом получения юзера из локалСтора
     */
    return router.push({
      pathname: path,
      query: {
        lang: language,
        user_id: 1,
        ...query
      }
    })
  }
  , [path, query])

