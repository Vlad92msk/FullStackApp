import React, { useContext } from 'react'
import { Text } from '@shared/components/Text'
import { Title } from '@shared/components/Title'
import { classnames } from '@bem-react/classnames'
import { Context } from './Context'
import { cn } from './cn'

export interface ModalHeaderProps {
  className?: string
  title?: string
  description?: string
  titlePosition?: 'left' | 'right' | 'center'
  descriptionPosition?: 'left' | 'right' | 'center'
}

export const ModalHeader: React.FunctionComponent<ModalHeaderProps> = (props) => {
  const { className, title, description, titlePosition, descriptionPosition, children } = props

  const { size } = useContext(Context)
  const isSmallSizeModal = size === 'small'

  return (
    <header
      className={classnames(
        cn('Header', {
          withReducedBottomPadding: isSmallSizeModal,
          withDivider: !isSmallSizeModal,
        }),
        className
      )}
    >
      {title && (
        <Title className={cn('Title', { withTopMargin: isSmallSizeModal, titlePosition })} size={isSmallSizeModal ? '3' : '4'} noMargin>
          {title}
        </Title>
      )}
      {description && (
        <Text className={cn('Description', { descriptionPosition })} color="note">
          {description}
        </Text>
      )}

      {children}
    </header>
  )
}

ModalHeader.defaultProps = {
  className: null,
}
