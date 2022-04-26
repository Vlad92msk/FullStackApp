import {
  FILE_FORMAT_APP,
  FILE_FORMAT_AUDIO, FILE_FORMAT_IMAGE,
  FILE_FORMAT_TEXT,
  FILE_FORMAT_VIDEO
} from '@client/public/models/fileFormats'

/**
 * Вложения которые можно скачать
 */
export const attachmentsForSave: string[] = Object.values({ ...FILE_FORMAT_APP, ...FILE_FORMAT_TEXT })
/**
 * Вложения которые можно воспроизвести
 */
export const attachmentsForPlay: string[] = Object.values({ ...FILE_FORMAT_AUDIO, ...FILE_FORMAT_VIDEO })

/**
 * Вложения которые можно посмотреть
 */
export const attachmentsForViewing: string[] = Object.values(FILE_FORMAT_IMAGE)
