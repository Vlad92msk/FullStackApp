import React from 'react'
import { Field, FieldProps } from '@client_shared/components/Field'
import { Select } from '../Select'

export type SelectFieldProps = FieldProps<typeof Select>

export class SelectField extends React.Component<SelectFieldProps> {
  render() {
    return <Field as={Select} isDiv {...this.props} />
  }
}
