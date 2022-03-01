import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import * as yup from 'yup'

import { useAuthSignInLazyQuery, useFindInterfaceQuery, SignInInput } from '@client_projects/gql-generated-hooks'
import { makeCn, storageSet } from '@client_shared/utils'
import { LocalStorageEnum } from '@client_public/models/localStorage'
import { FormEnums } from '@client_public/models/formEnums'
import { formStyles } from '@client_public/styles/materialUI'
import { Button } from '@client_shared/components/Button'
import { ResponseApi } from '@client_shared/components/ResponseApi'
import styles from './SignInForm.module.scss'

/**
 * Стили
 */
const cn = makeCn('SignInForm', styles)
const useStyles = makeStyles(() => (formStyles))

/**
 * Валидация
 */
const schema = yup.object().shape({
  email: yup.string().email(FormEnums.IS_EMAIL).required(FormEnums.IS_REQUIRED),
  password: yup.string().required(FormEnums.IS_REQUIRED).min(5, FormEnums.MIN)
})


type SignInFormType = {
  setSignIn: React.Dispatch<boolean>
}

export const SignInForm: React.FC<SignInFormType> = ({ setSignIn }) => {
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
  } = useForm<SignInInput>({ resolver: yupResolver(schema) })
  const emailWatch = watch('email')
  const passwordWatch = watch('password')

  /**
   * Query - Войти
   */
  const [authSignIn, { loading, error }] = useAuthSignInLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted({ authSignIn }) {
      if (authSignIn)
        storageSet(LocalStorageEnum.USER, authSignIn)
      setSignIn(false)
    }
  })

  const onSubmit = ({ password, email }: SignInInput) => authSignIn({
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
      <ResponseApi status={[userInterfaceLoading, loading]} errors={[userInterfaceError, error]}>
        {() => <>
          <TextField
            fullWidth {...register('email')} label={`${userInterface.enterEmail}...`} error={!!errors.email}
            helperText={errors.email?.message}
            inputProps={{ className: classes.input }}
            InputLabelProps={{ className: classes.label }}
          />
          <TextField
            fullWidth {...register('password')} label={`${userInterface.enterPassword}...`} error={!!errors.password}
            helperText={errors.password?.message}
            inputProps={{ className: classes.input }}
            InputLabelProps={{ className: classes.label }}
          />
          <Button
            className={cn('SubmitButton')}
            type='submit'
            icon={loading ? 'trash' : 'exit'}
            iconPosition={'left'}
            styleType={'filled'}
            color={'blue'}
            disabled={!!!emailWatch?.length || !!!passwordWatch?.length || !!errors.email || !!errors.password}
          >
            {userInterface.toComeIn}
          </Button>
        </>}
      </ResponseApi>
    </form>
  )
}
