import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { TextField } from '@material-ui/core'
import { FieldRow } from '@shared/components/FieldRow'

const schema = yup.object().shape({
  login: yup.string().email().required(),
  password: yup.string().required().min(5),
})

type FormValue = {
  login: string
  password: string
}

export const SignInForm: React.FC = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldRow width={'100'} wrap={'wrap'}>
        <TextField fullWidth {...register('login')} label={'Введите логин'} error={!!errors.login} helperText={errors.login?.message} />
        <TextField fullWidth {...register('password')} label={'Введите пароль'} error={!!errors.password} helperText={errors.password?.message} />
        <input width={100} type="submit" />
      </FieldRow>
    </form>
  )
}
