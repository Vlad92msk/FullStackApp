import { Entity, Column, PrimaryColumn } from 'typeorm'
// import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
@Entity()
export class Tokens {
  @Field()
  @PrimaryColumn()
  id?: number

  @Field({ description: 'Токен' })
  @Column({ name: 'token', unique: true })
  token: string

  @Field({ description: 'Чей токен' })
  @Column({ name: 'uid', unique: true })
  uid: number

  @Field(() => Date, { description: 'Сколько действует' })
  @Column({ name: 'expireAt' })
  expireAt: Date
}

// @ObjectType()
// @Table({ tableName: 'tokens' })
// export class Tokens extends Model {
//   @Field()
//   @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
//   id?: number
//
//   @Field({ description: 'Токен' })
//   @Column({ type: DataType.STRING, unique: true })
//   tokens: string
//
//   @Field({ description: 'Чей токен' })
//   @Column({ type: DataType.NUMBER, unique: true })
//   uid: number
//
//   @Field(() => Date, { description: 'Сколько действует' })
//   @Column({ type: DataType.DATE })
//   expireAt: Date
// }
