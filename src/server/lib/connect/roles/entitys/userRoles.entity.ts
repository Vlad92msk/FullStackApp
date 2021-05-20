import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToOne, ManyToOne, BaseEntity, PrimaryColumn } from 'typeorm'
// import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import { Users } from '~server/lib/connect/users/entitys/user.entity'
import { Roles } from '~server/lib/connect/roles/entitys/role.entity'

// @Entity()
// export class UserRoles1 {
//   @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
//   id: number
//
//   @ManyToOne(() => Users, (user) => user.id, { primary: true })
//   user: Users
//
//   @ManyToOne(() => Roles, (role) => role.id, { primary: true })
//   role: Roles
//
// }

// @Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
// export class UserRoles extends Model<UserRoles> {
//   @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
//   id: number
//
//   @ForeignKey(() => Roles)
//   @Column({ type: DataType.INTEGER })
//   roleId: number
//
//   @ForeignKey(() => Users)
//   @Column({ type: DataType.INTEGER })
//   userId: number
// }
