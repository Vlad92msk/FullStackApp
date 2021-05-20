import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'
import { Roles } from '../../roles/entitys/role.entity'

@ObjectType()
@Entity()
export class Users {
  @Field()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Field({ description: 'Чей токен' })
  @Column({ name: 'name' })
  name: string

  @Field({ description: 'Пароль' })
  @Column({ name: 'password' })
  password: string

  @Field({ description: 'Почта' })
  @Column({ name: 'email', unique: true })
  email: string

  @Field({ description: 'Статус' })
  @Column({ name: 'status' })
  status: string

  @Field(type => [Roles])
  @ManyToMany(() => Roles, (role) => role.users, { cascade: true })
  @JoinTable()
  roles: Roles[]
}
