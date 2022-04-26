import { useMemo } from 'react'
import { AddedFile } from '@client/shared/hooks/useMaterialsAttach'
import {
  attachmentsForPlay,
  attachmentsForSave,
  attachmentsForViewing
} from '@client/projects/social/components/Attachment/constants'

/**
 * Отдает вложения разбитые по назначению - для просмотра/проигрывания/отображения
 * @param attachments
 */
export const useAttachmentsPurpose = (attachments: AddedFile[]) => useMemo(() => attachments.reduce((acc, item) => ({
    toSave: [...acc.toSave, attachmentsForSave.includes(item.type) && item].filter(Boolean),
    toSlider: [...acc.toSlider, attachmentsForViewing.includes(item.type) && item].filter(Boolean),
    toPlay: [...acc.toPlay, attachmentsForPlay.includes(item.type) && item].filter(Boolean)
  })
  , {
    toSave: [] as AddedFile[],
    toSlider: [] as AddedFile[],
    toPlay: [] as AddedFile[]
  }), [attachments, attachmentsForSave, attachmentsForViewing, attachmentsForPlay])
