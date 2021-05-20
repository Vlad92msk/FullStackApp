import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { TextInput } from '@shared/components/TextInput'
import { TextField } from '@material-ui/core'
import { Option, Select } from '@shared/components/Select'
import { SelectField } from '@shared/components/SelectField'

export const SignUpForm: React.FC = (props) => {
  const { register, handleSubmit, control } = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <TextField {...register('firstName')} />
      <Controller
        name="iceCreamType"
        control={control}
        render={({ field }) => (
          <SelectField
            {...field}
            style={{ width: '100%', margin: 0 }}
            placeholder="Выберите ученика..."
            size="large"
            combobox
            tokenfield="check"
          >
            <Option value={1}>{1}</Option>
            <Option value={2}>{2}</Option>
            <Option value={3}>{3}</Option>
            <Option value={4}>{4}</Option>
          </SelectField>
        )}
      />
      <input type="submit" />
    </form>
  )
}
