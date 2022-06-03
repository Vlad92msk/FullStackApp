import React, { useState } from 'react'
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
  const [arr, setArr] = useState(data.slice(0, initViewCount))

  return (
    <>
      {arr.map((data, index) => (
        <React.Fragment key={data[key] || index}>
          {children(data, index)}
        </React.Fragment>
      ))}
      <ShowMore
        onShowMore={onShowMore}
        addCount={addCount}
        showArr={arr}
        totalArr={data}
        set={setArr}
      />
    </>
  )
})

ArrayMap.defaultProps = {
  initViewCount: 3
}
