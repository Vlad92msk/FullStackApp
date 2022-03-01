import React from 'react'
import { useWriteText, WriteTextType } from '@client_shared/hooks'

export const WriteText: React.FC<WriteTextType> = React.memo(({ myText, myDelay, speed, repeatCount }) => {
  const description = useWriteText({myText, repeatCount, myDelay, speed })

  return(<>{description}</>)
})
