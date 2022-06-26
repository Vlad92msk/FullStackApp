import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useAuthSignUpMutation, CreateUsersInput } from '@client_projects/gql-generated-hooks'
import { makeCn } from '@client_shared/utils'
import { ResponseApi } from '@client_shared/components/ResponseApi'
import { Button } from '@client_shared/components/Button'
import { formStyles } from '@client_public/styles/materialUI'
import { FormEnums } from '@client_public/models/formEnums'
import styles from './SignUpForm.module.scss'


/**
 * Стили
 */
const cn = makeCn('Form', styles)
const useStyles = makeStyles(() => (formStyles))


/**
 * Валидация
 */
const schema = yup.object().shape({
  email: yup.string().email(FormEnums.IS_EMAIL).required(FormEnums.IS_REQUIRED),
  password: yup.string().required(FormEnums.IS_REQUIRED).min(5, FormEnums.MIN),
  name: yup.string().required(FormEnums.IS_REQUIRED).min(5, FormEnums.MIN)
})


type SignUpFormType = {
}

export const SignUpForm: React.FC<SignUpFormType> = () => {
  const classes = useStyles()
  /**
   * Форма
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<CreateUsersInput>({ resolver: yupResolver(schema) })
  const emailWatch = watch('email')
  const passwordWatch = watch('password')
  const nameWatch = watch('name')

  /**
   * Mutation - Зарегистрироваться
   */
  const [authSignUp, { loading, error }] = useAuthSignUpMutation({
    onCompleted({ authSignUp }) {
      if (authSignUp) {
        // ........
      }
    }
  })

  const onSubmit = ({ password, email, name }: CreateUsersInput) => authSignUp({
    variables: {
      authSignUpUser: { name, email, password }
    },
    /**
     * TODO: Убрать когда будет реализовано подтверждение по почте
     */
    onCompleted({ authSignUp }) {
      if (authSignUp) console.log('authSignUp', authSignUp)
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn()}>
      <TextField
        fullWidth {...register('name')} label={`${'Введите логин'}...`} error={!!errors.name}
        helperText={errors.name?.message}
        inputProps={{ className: classes.input }}
        InputLabelProps={{ className: classes.label }}
      />
      <TextField
        fullWidth {...register('email')} label={`${'Введите Email'}`} error={!!errors.email}
        helperText={errors.email?.message}
        inputProps={{ className: classes.input }}
        InputLabelProps={{ className: classes.label }}
      />
      <TextField
        type={'text'} fullWidth {...register('password')} label={`${'Введите пароль'}...`}
        error={!!errors.password}
        helperText={errors.password?.message}
        inputProps={{ className: classes.input }}
        InputLabelProps={{ className: classes.label }}
      />
      <Button
        className={cn('SubmitButton')}
        type='submit'
        icon={'exit'}
        iconPosition={'left'}
        styleType={'filled'}
        color={'blue'}
        disabled={!!!emailWatch?.length || !!!passwordWatch?.length || !!!nameWatch?.length || !!errors.email || !!errors.password || !!errors.name}
      >
        {'Зарегистрироваться'}
      </Button>
    </form>
  )
}
