import React, { useEffect, useState } from 'react'
import { ShowMore } from '../ShowMore'

type ArrayMapProps = {
  key: string
  data: any[]
  initViewCount?: number
  children: (data: any, index?: number) => React.ReactNode | React.ReactNode[]
  addCount?: number
  onShowMore?: (count?: number) => void
}
export const ArrayMap: React.FC<ArrayMapProps> = React.memo((props) => {
  const { data, initViewCount, key, onShowMore, addCount, children } = props
  const [total, setTotal] = useState(data)
  const [arr, setArr] = useState(() => total.slice(0, initViewCount))

  useEffect(() => {
    setTotal(data)
  }, [data])

  return (
    <>
      {total?.map((data, index) => (
          <React.Fragment key={data[key] || index}>
            {children(data, index)}
          </React.Fragment>
        )
      )}
      <ShowMore
        onShowMore={onShowMore}
        addCount={addCount}
        showArr={arr}
        totalArr={total}
        set={setArr}
      />
    </>
  )
}, (a, b) => JSON.stringify(a) === JSON.stringify(b))

ArrayMap.defaultProps = {
  initViewCount: 3
}
