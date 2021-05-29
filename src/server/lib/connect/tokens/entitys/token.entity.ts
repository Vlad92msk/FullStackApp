import { Entity, Column, PrimaryColumn } from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
@Entity()
export class Tokens {
  @Field()
  @PrimaryColumn()
  id: number

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
