import React from 'react'
import { Select } from '../Select'
import { Field, FieldProps } from '@shared/components/Field'

export type SelectFieldProps = FieldProps<typeof Select>

export class SelectField extends React.Component<SelectFieldProps> {
  render() {
    return <Field as={Select} isDiv {...this.props} />
  }
}
