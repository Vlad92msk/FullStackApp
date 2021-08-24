import React, {useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { TextField } from '@material-ui/core'
import { FieldRow } from '@shared/components/FieldRow'
import { useLazyQuery } from '@apollo/client'
import { appQueries } from '~client/modules/core/graphql/queries'
import { SignInInput } from '~server/lib/connect/auth/inputs/signIn.input'
import { IconButton } from '@shared/components/IconButton'
import { storageSet } from '@shared/utils'
import { LocalStorageEnum } from '@shared/types/localStorage'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5)
})

type SignInFormType = {
  setSignIn: React.Dispatch<boolean>
}
export const SignInForm: React.FC<SignInFormType> = ({setSignIn}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<SignInInput>({
    resolver: yupResolver(schema)
  })

  const [authSignIn, { data, loading = null, error }] = useLazyQuery<any>(appQueries.LOG_IN, {fetchPolicy: 'network-only'})

  const emailWatch = watch('email')
  const passwordWatch = watch('password')

  const [{ email, password }, setFormDate] = useState<SignInInput>({ email: emailWatch, password: passwordWatch })

  useEffect(() => {
    setFormDate({email: emailWatch, password: passwordWatch})
  }, [passwordWatch, emailWatch]);

  /**
   * Сбрасывает форму если ошибка
   */
  useEffect(() => {
     if (error) {
       setFormDate({email: null, password: null})
     }
  }, [error]);

  useEffect(() => {
     if (data) {
       storageSet(LocalStorageEnum.USER, data.authSignIn)
       setSignIn(false)
     }
  }, [setSignIn, data]);

  const onSubmit = ({ password, email }: SignInInput) =>
    authSignIn({
      variables: {
        authSignInUser: {
          'email': 'vlad11@mail.ru',
          'password': '123456789Qq'
          // email, password
        }
      },
    })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {loading ? 'loading' : (
        <FieldRow width={'100'} wrap={'wrap'} justify={'center'}>
          <TextField fullWidth {...register('email')} label={'Введите логин'} error={!!errors.email}
                     helperText={errors.email?.message} />
          <TextField fullWidth {...register('password')} label={'Введите пароль'} error={!!errors.password}
                     helperText={errors.password?.message} />
          <IconButton type='submit' icon={'attachment'} disabled={!!!email?.length || !!!password?.length || !!errors.email || !!errors.password} />
        </FieldRow>
      )}
    </form>
  )
}
