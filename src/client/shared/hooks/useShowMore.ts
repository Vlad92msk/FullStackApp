import { useCallback, useState } from 'react'

/**
 * По сколько комментариев отображать
 */
export const COUNT_VISIBLE = 1

export const useShowMore = (arr: any[], setS, addCount = COUNT_VISIBLE, initViewCount) => {
  const [startWith, setStartWith] = useState(initViewCount)

  return useCallback(() => {
    setS(prev => [...prev, ...arr.slice(startWith, startWith + addCount)])
    setStartWith(prev=> prev + addCount)
  }, [startWith, arr, addCount, setS, initViewCount])
}
