import React, { useMemo } from 'react'
import { Button } from '../../components/Button'
import { Text } from '../../components/Text'
import { length, makeCn } from '../../utils'
import { COUNT_VISIBLE, useShowMore } from '../../hooks'
import styles from './ShowMore.module.scss'

const cn = makeCn('ShowMore', styles)

type ShowMoreProps = {
  set: (args: any) => void
  totalArr: any[]
  showArr: any[]
}
export const ShowMore: React.FC<ShowMoreProps> = React.memo((props) => {
  const { set, showArr, totalArr } = props
  const handleClick = useShowMore(totalArr, set)
  const totalArrLength = useMemo(() => length(totalArr), [totalArr])
  const showArrLength = useMemo(() => length(showArr), [showArr])


  return (
    <Button
      className={cn()}
      size={'small'}
      onClick={handleClick}
      color={'grey'}
      styleType={'rounded'}
      disabled={totalArrLength === showArrLength}
    >
      <Text
        size={'1'}
        children={`Показать ${totalArrLength ? 'еще' : `первые ${COUNT_VISIBLE}`} (${showArrLength}/${totalArrLength})`}
      />
    </Button>
  )
})
