import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'
import { InterfaceType } from './userInterface_ru.entity'

@ObjectType({ description: 'Интерфейс портфолио (en)' })
@Entity('Interface_en', { database: 'portfolio', schema: 'interface' })
export class Interface_en implements InterfaceType {
  @Field()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Field({ description: 'Фамилия' })
  @Column({ name: 'surname', type: 'varchar', length: 30, default: 'Surname' })
  surname: string

  @Field({ description: 'Имя' })
  @Column({ name: 'name', type: 'varchar', length: 10, default: 'Name' })
  name: string

  @Field({ description: 'Отчество' })
  @Column({ name: 'patronymic', type: 'varchar', length: 30, default: 'Patronymic' })
  patronymic: string

  @Field({ description: 'Телефон' })
  @Column({ name: 'telephone', type: 'varchar', length: 30, default: 'Telephone' })
  telephone: string

  @Field({ description: 'Возраст' })
  @Column({ name: 'age', type: 'varchar', length: 10, default: 'Age' })
  age: string

  @Field({ description: 'Специальность' })
  @Column({ name: 'speciality', type: 'varchar', length: 30, default: 'Speciality' })
  speciality: string

  @Field({ description: 'Стаж' })
  @Column({ name: 'experience', type: 'varchar', length: 30, default: 'Experience' })
  experience: string

  @Field({ description: 'Умения и навыки' })
  @Column({ name: 'skillsAndAbilities', type: 'varchar', length: 50, default: 'Skills and abilities' })
  skillsAndAbilities: string

  @Field({ description: 'Сообщение' })
  @Column({ name: 'message', type: 'varchar', length: 20, default: 'Message' })
  message: string

  @Field({ description: 'Войти' })
  @Column({ name: 'toComeIn', type: 'varchar', length: 30, default: 'To come in' })
  toComeIn: string

  @Field({ description: 'Зарегистрироваться' })
  @Column({ name: 'register', type: 'varchar', length: 20, default: 'Register' })
  register: string

  @Field({ description: 'Введите емайл' })
  @Column({ name: 'enterEmail', type: 'varchar', length: 40, default: 'Enter email' })
  enterEmail: string

  @Field({ description: 'Введите пароль' })
  @Column({ name: 'enterPassword', type: 'varchar', length: 40, default: 'Enter password' })
  enterPassword: string

  @Field({ description: 'Введите логин' })
  @Column({ name: 'enterLogin', type: 'varchar', length: 40, default: 'Enter login' })
  enterLogin: string
}

/**
 * type: 'varchar' - Для строк до 65535 символов
 * length: 30 - кол-во букв в строке (в т.ч пробелы)
 * width: 4 - кол-во цифр в числе
 */
