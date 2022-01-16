import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'

export interface ArticleType {
  id?: number
  title?: string
  article?: string
}


@ObjectType({ description: 'Стаьи о космосе' })
@Entity('Article_ru', { database: 'cosmo', schema: 'articles' })
export class Article_ru implements ArticleType {
  @Field()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Field({ description: 'Название статьи' })
  @Column({ name: 'title', type: 'varchar', length: 30 })
  title: string

  @Field({ description: 'Текст статьи' })
  @Column({ name: 'article', type: 'text' })
  article: string
}

/**
 * type: 'varchar' - Для строк до 65535 символов
 * length: 30 - кол-во букв в строке (в т.ч пробелы)
 * width: 4 - кол-во цифр в числе
 */
