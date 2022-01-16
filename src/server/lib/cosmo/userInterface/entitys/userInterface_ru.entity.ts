import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'

export interface InterfaceType {
  firstSpace: string
  recentlyAdded: string
  sort: string
  articles: string
}


@ObjectType({ description: 'Интерфейс космо (ru)' })
@Entity('Interface_cosmo_ru', { database: 'cosmo', schema: 'interface' })
export class Interface_cosmo_ru implements InterfaceType {
  @Field()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Field({ description: 'Первый космический' })
  @Column({ name: 'firstSpace', type: 'varchar', length: 20, default: 'Первый космический' })
  firstSpace: string

  @Field({ description: 'Недавно добавлены' })
  @Column({ name: 'recentlyAdded', type: 'varchar', length: 20, default: 'Недавно добавлены' })
  recentlyAdded: string

  @Field({ description: 'Сортировать' })
  @Column({ name: 'sort', type: 'varchar', length: 20, default: 'Сортировать' })
  sort: string

  @Field({ description: 'Статьи' })
  @Column({ name: 'articles', type: 'varchar', length: 10, default: 'Статьи' })
  articles: string
}

/**
 * type: 'varchar' - Для строк до 65535 символов
 * length: 30 - кол-во букв в строке (в т.ч пробелы)
 * width: 4 - кол-во цифр в числе
 */
