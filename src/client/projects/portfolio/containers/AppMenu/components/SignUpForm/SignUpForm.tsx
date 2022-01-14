import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { makeCn } from '@shared/utils'
import { ResponseApi } from '@shared/components/ResponseApi'
import { Button } from '@shared/components/Button'
import { useAuthSignUpMutation, useFindInterfaceQuery } from '~client/projects/gql-generated-hooks'

import { CreateUsersInput } from '~server/lib/connect/users/inputs/create-user.input'
import { formStyles } from '~public/styles/materialUI'
import { FormEnums } from '~public/models/formEnums'
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
  setSignIn: React.Dispatch<boolean>
}

export const SignUpForm: React.FC<SignUpFormType> = ({ setSignIn }) => {
  const classes = useStyles()

  const {
    data: {
      userInterfacePortfolioFindAll: userInterface
    } = {},
    loading: userInterfaceLoading,
    error: userInterfaceError
  } = useFindInterfaceQuery()

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
      if (authSignUp) setSignIn(false)
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
      <ResponseApi status={[userInterfaceLoading, loading]} errors={[userInterfaceError, error]}>
        {() => <>
          <TextField
            fullWidth {...register('name')} label={`${userInterface.enterLogin}...`} error={!!errors.name}
            helperText={errors.name?.message}
            inputProps={{ className: classes.input }}
            InputLabelProps={{ className: classes.label }}
          />
          <TextField
            fullWidth {...register('email')} label={`${userInterface.enterEmail}`} error={!!errors.email}
            helperText={errors.email?.message}
            inputProps={{ className: classes.input }}
            InputLabelProps={{ className: classes.label }}
          />
          <TextField
            type={'text'} fullWidth {...register('password')} label={`${userInterface.enterPassword}...`}
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
            {userInterface.register}
          </Button>
        </>}
      </ResponseApi>
    </form>
  )
}
