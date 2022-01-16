import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'
import { InterfaceType } from './userInterface_ru.entity'

@ObjectType({ description: 'Интерфейс космо (en)' })
@Entity('Interface_cosmo_en', { database: 'cosmo', schema: 'interface' })
export class Interface_cosmo_en implements InterfaceType {
  @Field()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Field({ description: 'Первый космический' })
  @Column({ name: 'firstSpace', type: 'varchar', length: 20, default: 'First space' })
  firstSpace: string

  @Field({ description: 'Недавно добавлены' })
  @Column({ name: 'recentlyAdded', type: 'varchar', length: 20, default: 'Recently added' })
  recentlyAdded: string

  @Field({ description: 'Сортировать' })
  @Column({ name: 'sort', type: 'varchar', length: 10, default: 'Sort' })
  sort: string

  @Field({ description: 'Статьи' })
  @Column({ name: 'articles', type: 'varchar', length: 10, default: 'Articles' })
  articles: string
}

/**
 * type: 'varchar' - Для строк до 65535 символов
 * length: 30 - кол-во букв в строке (в т.ч пробелы)
 * width: 4 - кол-во цифр в числе
 */
