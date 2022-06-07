import React, { useCallback } from 'react'

import { Action, makeCn } from '@client_shared/utils'
import { Modal } from '@client_shared/components/Modal'
import { Actions, Description, Header, MainInfo } from '../../components'
import {
  commentsActions, ServiceCommentsType,
  useServiceCommentsAction, useServiceCommentsSelector
} from '../../service'
import styles from './ModalViewAnswers.module.scss'
import { values } from 'lodash'

const cn = makeCn('ModalViewAnswers', styles)


export type ModalViewAnswersProps = {
  modalComment: ServiceCommentsType
  dispatch: (action: Action) => void
}

const ModalViewAnswers: React.FC<ModalViewAnswersProps> = React.memo((props) => {
  const { modalComment, dispatch } = props
  const { appealToAnswerId, appealToUserName, userName, date, description, answers, appealToCommentId, commentId } = modalComment
  const commentsService = useServiceCommentsSelector('comments')
  // @ts-ignore
  const find = commentsService[appealToCommentId].answers.find(({commentId: id}) => id === commentId)?.answers
  const handleCloseModal = useCallback(() => {
    if (modalComment) {
      dispatch(commentsActions.SET__OPEN_MODAL_FOR_VIEW_ANSWERS({
        comment: null
      }))
    }
  }, [commentsActions, dispatch, modalComment])

  return (
    <Modal
      className={cn()}
      open={true}
      onClose={handleCloseModal}
    >
      <div className={cn('SeeComment')}>
        <Header
          appealToAnswerId={appealToAnswerId}
          appealToUserName={appealToUserName}
          userName={userName}
          date={date}
        />
        <Description description={description} appealToAnswerId={appealToAnswerId} type={'main'} />
        <Actions disableOpenSeeAnswers={true} type={'sub'} comment={modalComment} />
      </div>
      <div className={cn('ModalContainer')}>
        {find?.map((item) => (
          <MainInfo
            key={item.commentId}
            isOpenSeeAnswers={true}
            type={'sub'}
            comment={item}
          />
        ))}
      </div>
    </Modal>
  )
})


export const ModalViewAnswersHOC: React.FC = () => {
  const modalComment = useServiceCommentsSelector('modalComment') || null
  const dispatch = useServiceCommentsAction()

  if (!modalComment) return <></>
  return <ModalViewAnswers modalComment={modalComment} dispatch={dispatch} />
}
