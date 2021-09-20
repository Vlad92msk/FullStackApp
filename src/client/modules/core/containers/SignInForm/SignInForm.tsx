import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { TextField } from '@material-ui/core'
import { useLazyQuery } from '@apollo/client'
import { appQueries } from '~client/modules/core/graphql/queries'
import { SignInInput } from '~server/lib/connect/auth/inputs/signIn.input'
import { IconButton } from '@shared/components/IconButton'
import { makeCn, storageSet } from '@shared/utils'
import { LocalStorageEnum } from '~public/models/localStorage'
import { makeStyles } from '@material-ui/core/styles'
import { formStyles } from '~client/modules/core/styles/materialUI'
import styles from './SignInForm.module.scss'

const cn = makeCn('SignInForm', styles)
const useStyles = makeStyles(() => (formStyles))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5)
})

type SignInFormType = {
  setSignIn: React.Dispatch<boolean>
}
export const SignInForm: React.FC<SignInFormType> = ({ setSignIn }) => {
  const classes = useStyles()
  const {register, handleSubmit, formState: { errors }, watch } = useForm<SignInInput>({ resolver: yupResolver(schema) })
  const emailWatch = watch('email')
  const passwordWatch = watch('password')
  const [{ email, password }, setFormDate] = useState<SignInInput>({ email: emailWatch, password: passwordWatch })

  const [authSignIn, { data, loading, error }] = useLazyQuery<any>(appQueries.LOG_IN, { fetchPolicy: 'network-only' })

  useEffect(() => setFormDate({
    email: emailWatch,
    password: passwordWatch
  }), [passwordWatch, emailWatch])

  /**
   * Сбрасывает форму если ошибка
   */
  useEffect(() => {
    if (error) setFormDate({ email: null, password: null })
  }, [error])

  /**
   * Если все ОК - записываются данные в LocalStorage и закрывается модалка
   */
  useEffect(() => {
    if (data) {
      storageSet(LocalStorageEnum.USER, data.authSignIn)
      setSignIn(false)
    }
  }, [setSignIn, data])

  const onSubmit = ({ password, email }: SignInInput) =>
    authSignIn({
      variables: {
        authSignInUser: {
          'email': 'vlad11@mail.ru',
          'password': '123456789Qq'
          // email, password
        }
      }
    })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn()}>
        <TextField
          fullWidth {...register('email')} label={'Введите email...'} error={!!errors.email}
          helperText={errors.email?.message}
          inputProps={{ className: classes.input }}
          InputLabelProps={{ className: classes.label }}
        />
        <TextField
          fullWidth {...register('password')} label={'Введите пароль...'} error={!!errors.password}
          helperText={errors.password?.message}
          inputProps={{ className: classes.input }}
          InputLabelProps={{ className: classes.label }}
        />
        <IconButton
          className={cn('SubmitButton')}
          type='submit'
          icon={loading ? 'trash' : 'exit'}
          fill={'bluePrimrose50'}
          disabled={!!!email?.length || !!!password?.length || !!errors.email || !!errors.password}
        />
    </form>
  )
}
