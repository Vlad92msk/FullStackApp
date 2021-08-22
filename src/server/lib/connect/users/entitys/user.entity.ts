import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'
import { Role } from '../../roles/entitys/role.entity'

@ObjectType()
@Entity({ name: 'Users' })
export class User {
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

  @Field(() => [Role])
  @ManyToMany(() => Role, ({ users }) => users, { cascade: true })
  @JoinTable()
  roles: Role[]

  @Field(() => [String])
  @Column('simple-array', { name: 'uRoles' })
  uRoles: string[]
}
