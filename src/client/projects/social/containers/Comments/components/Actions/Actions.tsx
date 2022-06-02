import React, { useCallback, useState } from 'react'

import { length, makeCn } from '@client_shared/utils'
import { Icon } from '@client_shared/components/Icon'
import { Text } from '@client_shared/components/Text'
import { ButtonBox } from '@client_shared/components/ButtonBox'
import { IconButton } from '@client_shared/components/IconButton'
import { useToggle } from '@client_shared/hooks'
import { Modal } from '@client_shared/components/Modal'
import { Description, Header, InputComment, MainInfo, MainInfoType } from '../../components'
import { ServiceCommentsType } from '../../service'
import styles from './Actions.module.scss'

const cn = makeCn('Actions', styles)


export type ActionsType = {
  type: MainInfoType
  disableOpenSeeAnswers: boolean
  comment: ServiceCommentsType
  onOpenAnswer?: React.Dispatch<React.SetStateAction<string>>
}

export const Actions: React.FC<ActionsType> = (props) => {
  const { onOpenAnswer, type, comment, disableOpenSeeAnswers } = props
  const {
    userIdsLikes,
    userIdsDislikes,
    commentId,
    answers,
    userName,
    date,
    appealToAnswerId,
    appealToUserName,
    description
  } = comment

  const [isOpenAddAnswer, setOpenAddAnswer] = useToggle(false)
  const [isOpenSeeAnswers, setOpenSeeAnswers] = useToggle(false)

  const [toggle, setToggle] = useState(true)

  const handleOpenAnswer = useCallback(() => {
    if (toggle) {
      onOpenAnswer?.(commentId)
      setToggle(false)
    } else {
      onOpenAnswer?.(null)
      setToggle(true)
    }
  }, [commentId, toggle])

  const handleOpenAnswers = useCallback(() => {
    if (!disableOpenSeeAnswers) {
      setOpenSeeAnswers()
    }
  }, [disableOpenSeeAnswers, setOpenSeeAnswers])

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
      {isOpenAddAnswer && (<InputComment />)}
      <Modal
        className={cn('Modal')}
        open={isOpenSeeAnswers}
        onClose={setOpenSeeAnswers}
      >
        <div className={cn('SeeComment')}>
          <Header
            appealToAnswerId={appealToAnswerId}
            appealToUserName={appealToUserName}
            userName={userName}
            date={date}
          />
          <Description description={description} appealToAnswerId={appealToAnswerId} type={type} />
        </div>
        <div className={cn('ModalContainer')}>
          {answers?.map((item) => (
            <MainInfo
              key={item.commentId}
              isOpenSeeAnswers={isOpenSeeAnswers}
              type={'sub'}
              comment={item}
              onOpenAnswer={() => 1}
            />
          ))}
        </div>
      </Modal>
    </>
  )
}
