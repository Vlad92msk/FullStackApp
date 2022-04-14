import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'


export const useReplaceRouterUrl = (oldParam: string, newParam: string): [() => void, string] => {
  const { asPath, push } = useRouter()
  const path = useMemo(() => asPath.replace(oldParam, newParam), [oldParam, newParam])
  const push1 = useCallback(() => push(path), [path])

  return [push1, path]
}

export const useReplaceRouterQuery = (newQuery) => {
  const { query, replace } = useRouter()

  return useCallback(() => replace({ query: { ...query, ...newQuery } }), [query, newQuery])
}
