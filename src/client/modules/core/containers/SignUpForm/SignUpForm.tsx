import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TextField } from '@material-ui/core'
import { IconButton } from '@shared/components/IconButton'
import * as yup from 'yup'
import { makeStyles } from "@material-ui/core/styles";
import { yupResolver } from '@hookform/resolvers/yup'
import { makeCn } from '@shared/utils'
import { CreateUsersInput } from '~server/lib/connect/users/inputs/create-user.input'
import { formStyles } from '~client/modules/core/styles/materialUI'
import styles from './SignUpForm.module.scss'

const cn = makeCn('Form', styles)
const useStyles = makeStyles(() => (formStyles));

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
  name: yup.string().required().min(5)
})

export const SignUpForm: React.FC = (props) => {
  const classes = useStyles();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<CreateUsersInput>({ resolver: yupResolver(schema) })
  const emailWatch = watch('email')
  const passwordWatch = watch('password')
  const nameWatch = watch('name')
  const [{ email, password, name }, setFormDate] = useState<CreateUsersInput>({ email: emailWatch, password: passwordWatch, name: nameWatch })
  const onSubmit = (data) => console.log(data)

  useEffect(() => setFormDate({
    email: emailWatch,
    password: passwordWatch,
    name: nameWatch
  }), [passwordWatch, emailWatch, nameWatch])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn()} >
      <TextField
        fullWidth {...register('name')} label={'Введите login...'} error={!!errors.name}
        helperText={errors.name?.message}
        inputProps={{ className: classes.input }}
        InputLabelProps={{ className: classes.label }}
      />
      <TextField
        fullWidth {...register('email')} label={'Введите email...'} error={!!errors.email}
        helperText={errors.email?.message}
        inputProps={{ className: classes.input }}
        InputLabelProps={{ className: classes.label }}
      />
      <TextField
        type={'text'} fullWidth {...register('password')} label={'Введите пароль...'} error={!!errors.password}
        helperText={errors.password?.message}
        inputProps={{className: classes.input}}
        InputLabelProps={{className: classes.label}}
      />
      <IconButton
        classNameIcon={cn('SubmitButton')}
        type='submit'
        icon={'exit'}
        fill={'bluePrimrose50'}
        disabled={!!!email?.length || !!!password?.length || !!errors.email || !!errors.password}
      />
    </form>
  )
}
