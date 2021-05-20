import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'
import { Users } from '../../users/entitys/user.entity'

@ObjectType()
@Entity()
export class Roles {
  @Field({ description: 'id' })
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Field({ description: 'Название роли' })
  @Column({ name: 'value' })
  value: string

  @Field({ description: 'Описание роли' })
  @Column({ name: 'description' })
  description: string

  @Field(() => [Users])
  @ManyToMany(() => Users, (user) => user.roles)
  users: Users[]
}
