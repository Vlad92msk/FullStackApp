import { InputType, Field } from '@nestjs/graphql'
import { IsNumber, IsString } from 'class-validator'
import { ArticleType } from '~server/lib/cosmo/articles/entitys/articles.entity'
import { VALIDATE_MESSAGE } from '~server/types'

/**
 * На будущее
 * Pick - берет за основу тип и указываем, что из него оставить
 * на будущее - Omit - наоборот - что из него удалить
 * @see https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys
 */
export type FindArticleInputType = Pick<ArticleType, 'id' | 'title' | 'article'>

@InputType({ description: 'Найти статью' })
export class FindArticleInput implements FindArticleInputType {
  @Field({ nullable: true })
  @IsNumber(null, { message: VALIDATE_MESSAGE.IS_NUMBER })
  id?: number

  @Field({ name: 'article', description: 'Текст стаьи', nullable: true })
  @IsString({ message: VALIDATE_MESSAGE.IS_STRING })
  article?: string

  @Field({ name: 'title', description: 'Название стаьи', nullable: true })
  @IsString({ message: VALIDATE_MESSAGE.IS_STRING })
  title?: string
}
