import { useCallback, useMemo, useState } from 'react'

/**
 * По сколько комментариев отображать
 */
export const COUNT_VISIBLE = 1

export const useShowMore = (arr: any[], setS, addCount = COUNT_VISIBLE) => {
  let startWith = useMemo(() => 0, [])

  return useCallback(() => {
    setS(prev => [...prev, ...arr.slice(startWith, startWith + addCount)])
    startWith += addCount
  }, [startWith, arr, addCount])
}
