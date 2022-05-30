import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { DefaultObject } from '@client/public/models/defaultObject.model'


export const useReplaceRouterUrl = (oldParam: string, newParam: string): [() => void, string] => {
  const { asPath, push } = useRouter()
  const path = useMemo(() => asPath.replace(oldParam, newParam), [oldParam, newParam])
  const push1 = useCallback(() => push(path), [path])

  return [push1, path]
}

export const useReplaceRouterQuery = (newQuery: DefaultObject, remove?: string[]) => {
  const { query, replace } = useRouter()
  const refQuery = { ...query }

  if (remove) {
    remove.forEach((item) => delete refQuery[item])
  }
  return useCallback(() => replace({ query: { ...refQuery, ...newQuery } }), [refQuery, newQuery, remove])
}
