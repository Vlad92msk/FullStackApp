import React, { useCallback, useState } from 'react'

import { length, makeCn } from '@client_shared/utils'
import { Icon } from '@client_shared/components/Icon'
import { Text } from '@client_shared/components/Text'
import { ButtonBox } from '@client_shared/components/ButtonBox'
import { IconButton } from '@client_shared/components/IconButton'
import { useToggle } from '@client_shared/hooks'
import { COMMENT_FOR, InputComment, MainInfoType } from '../../components'
import { commentsActions, ServiceCommentsType, useServiceCommentsAction } from '../../service'
import styles from './Actions.module.scss'

const cn = makeCn('Actions', styles)


export type ActionsType = {
  type: MainInfoType
  disableOpenSeeAnswers: boolean
  comment: ServiceCommentsType
}

export const Actions: React.FC<ActionsType> = React.memo((props) => {
  const { type, comment, disableOpenSeeAnswers } = props
  const {
    userIdsLikes,
    userIdsDislikes,
    commentId,
    answers
  } = comment
  const dispatch = useServiceCommentsAction()
  const [isOpenAddAnswer, setOpenAddAnswer] = useToggle(false)

  const [toggle, setToggle] = useState(true)

  const handleOpenAnswer = useCallback(() => {
    if (toggle) {
      dispatch(commentsActions.SET__OPEN_COMMENT_ID({
        commentId
      }))
      setToggle(false)
    } else {
      dispatch(commentsActions.SET__OPEN_COMMENT_ID({
        commentId: null
      }))
      setToggle(true)
    }
  }, [commentId, toggle, dispatch])

  const handleOpenAnswers = useCallback(() => {
    if (!disableOpenSeeAnswers) {
      dispatch(commentsActions.SET__OPEN_MODAL_FOR_VIEW_ANSWERS({
        comment
      }))
    }
  }, [disableOpenSeeAnswers, commentsActions, dispatch])

  return (
    <>
      <div className={cn()}>
        {type === 'sub' ? (
          <IconButton
            className={cn('Button')}
            size={'small'}
            icon={'message-square'}
            fill={'bluePrimrose50'}
            onClick={setOpenAddAnswer}
          />
        ) : (<div />)}
        <div style={{ display: 'flex' }}>
          <ButtonBox
            className={cn('Button')}
            disabled={type === 'sub' && !length(answers)}
            onClick={type === 'main' ? handleOpenAnswer : handleOpenAnswers}
          >
            <Icon
              className={cn('ButtonIcon')}
              size={'small'}
              icon={'undo'}
              fill={'light100'}
            />
            <Text
              className={cn('ButtonText')}
              size={'1'}
              children={length(answers)}
            />
          </ButtonBox>
          <ButtonBox className={cn('Button')}>
            <Icon
              className={cn('ButtonIcon')}
              size={'small'}
              icon={'heart'}
              fill={'redRose40'}
            />
            <Text className={cn('ButtonText')} size={'1'} children={length(userIdsLikes)} />
          </ButtonBox>
          <ButtonBox className={cn('Button')}>
            <Icon
              className={cn('ButtonIcon')}
              size={'small'}
              icon={'dislike'}
              fill={'bluePrimrose50'}
            />
            <Text className={cn('ButtonText')} size={'1'} children={length(userIdsDislikes)} />
          </ButtonBox>
        </div>
      </div>
      {isOpenAddAnswer && (<InputComment inputFor={COMMENT_FOR.ANSWER} />)}
    </>
  )
})
