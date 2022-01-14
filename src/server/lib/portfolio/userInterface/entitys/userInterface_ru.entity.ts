import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'

export interface InterfaceType {
  surname: string
  name: string
  patronymic: string
  telephone: string
  age: string
  speciality: string
  experience: string
  skillsAndAbilities: string
  message: string
  toComeIn: string
  register: string
  enterEmail: string
  enterPassword: string
  enterLogin: string
}


@ObjectType({ description: 'Интерфейс портфолио (ru)' })
@Entity('Interface_ru', { database: 'portfolio', schema: 'interface' })
export class Interface_ru implements InterfaceType {
  @Field()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Field({ description: 'Фамилия' })
  @Column({ name: 'surname', type: 'varchar', length: 20, default: 'Фамилия' })
  surname: string

  @Field({ description: 'Имя' })
  @Column({ name: 'name', type: 'varchar', length: 10, default: 'Имя' })
  name: string

  @Field({ description: 'Отчество' })
  @Column({ name: 'patronymic', type: 'varchar', length: 20, default: 'Отчество' })
  patronymic: string

  @Field({ description: 'Телефон' })
  @Column({ name: 'telephone', type: 'varchar', length: 20, default: 'Телефон' })
  telephone: string

  @Field({ description: 'Возраст' })
  @Column({ name: 'age', type: 'varchar', length: 20, default: 'Возраст' })
  age: string

  @Field({ description: 'Специальность' })
  @Column({ name: 'speciality', type: 'varchar', length: 20, default: 'Специальность' })
  speciality: string

  @Field({ description: 'Стаж' })
  @Column({ name: 'experience', type: 'varchar', length: 10, default: 'Стаж' })
  experience: string

  @Field({ description: 'Умения и навыки' })
  @Column({ name: 'skillsAndAbilities', type: 'varchar', length: 40, default: 'Умения и навыки' })
  skillsAndAbilities: string

  @Field({ description: 'Сообщение' })
  @Column({ name: 'message', type: 'varchar', length: 20, default: 'Сообщение' })
  message: string

  @Field({ description: 'Войти' })
  @Column({ name: 'toComeIn', type: 'varchar', length: 20, default: 'Войти' })
  toComeIn: string

  @Field({ description: 'Зарегистрироваться' })
  @Column({ name: 'register', type: 'varchar', length: 30, default: 'Зарегистрироваться' })
  register: string

  @Field({ description: 'Введите емайл' })
  @Column({ name: 'enterEmail', type: 'varchar', length: 30, default: 'Введите емайл' })
  enterEmail: string

  @Field({ description: 'Введите пароль' })
  @Column({ name: 'enterPassword', type: 'varchar', length: 30, default: 'Введите пароль' })
  enterPassword: string

  @Field({ description: 'Введите логин' })
  @Column({ name: 'enterLogin', type: 'varchar', length: 30, default: 'Введите логин' })
  enterLogin: string
}

/**
 * type: 'varchar' - Для строк до 65535 символов
 * length: 30 - кол-во букв в строке (в т.ч пробелы)
 * width: 4 - кол-во цифр в числе
 */
