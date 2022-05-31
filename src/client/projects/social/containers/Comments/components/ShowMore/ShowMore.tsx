import React from 'react'
import { Button } from '@client/shared/components/Button'
import { COMMENTS } from '@client/projects/social/containers/Comments/data/comments.data'
import { Text } from '@client/shared/components/Text'
import { makeCn } from '@client/shared/utils'
import { COUNT_VISIBLE_COMMENTS } from '@client/projects/social/containers/Comments'
import styles from './ShowMore.module.scss'

const cn = makeCn('ShowMore', styles)

type ShowMoreProps = {
  handleOpenComments: () => void
  commentsLength: number
}
export const ShowMore:React.FC<ShowMoreProps> = (props) => {
  const {handleOpenComments, commentsLength} = props
  return (
    <Button
      className={cn()}
      size={'small'}
      onClick={handleOpenComments}
      color={'grey'}
      styleType={'rounded'}
      disabled={commentsLength === COMMENTS.length}
    >
      <Text
        size={'1'}
        children={`Показать ${commentsLength ? 'еще' : `первые ${COUNT_VISIBLE_COMMENTS}`} [${commentsLength}/${COMMENTS.length}]`}
      />
    </Button>
  )
}
