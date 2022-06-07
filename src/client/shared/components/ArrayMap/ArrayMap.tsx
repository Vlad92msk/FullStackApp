import React, { useMemo, useState } from 'react'
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
  const [startWith, setStartWith] = useState(initViewCount)

  const arr = useMemo(() => data.slice(0, startWith), [data, startWith])

  return (
    <>
      {arr.map((data, index) => (
          <React.Fragment key={data[key] || index}>
            {children(data, index)}
          </React.Fragment>
        )
      )}
      <ShowMore
        onShowMore={onShowMore}
        addCount={addCount}
        showArr={arr}
        totalArr={data}
        set={setStartWith}
      />
    </>
  )
})

ArrayMap.defaultProps = {
  initViewCount: 3,
  addCount: 1
}
