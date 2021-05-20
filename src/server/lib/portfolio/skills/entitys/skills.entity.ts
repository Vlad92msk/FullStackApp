import { Entity, Column, PrimaryColumn } from 'typeorm'
// import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { Field, ObjectType } from '@nestjs/graphql'
import { IconName } from '~public/models/icon.model'

@ObjectType()
@Entity()
export class Skills {
  @Field()
  @PrimaryColumn({ name: 'id' })
  id: number

  @Field({ description: 'Название' })
  @Column({ name: 'name' })
  name: IconName

  @Field({ description: 'Позиция на сетке' })
  @Column({ name: 'position' })
  position: number

  @Field({ description: 'Специальность (Frontend/Backend/Other)' })
  @Column({ name: 'specialty' })
  specialty: 'backend' | 'frontend' | 'other'
}

// @ObjectType()
// @Table({ tableName: 'skills' })
// export class Skills extends Model {
//   @Field()
//   @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
//   id: number
//
//   @Field({ description: 'Название' })
//   @Column({ type: DataType.STRING })
//   name: IconName
//
//   @Field({ description: 'Позиция на сетке' })
//   @Column({ type: DataType.NUMBER })
//   position: number
//
//   @Field({ description: 'Специальность (Frontend/Backend/Other)' })
//   @Column({ type: DataType.STRING })
//   specialty: 'backend' | 'frontend' | 'other'
// }
