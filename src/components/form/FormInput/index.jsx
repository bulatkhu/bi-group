import React from 'react'
import Input from './components/Input'
import PassInput from './components/PassInput'
import './styles.scss'

const FormInput = ({ type, form, ...rest }) => {
  if (type === 'password') {
    return (
      <div className="fromInput__wrapper">
        <PassInput {...rest} form={form} />
      </div>
    )
  }

  return (
    <div className="fromInput__wrapper">
      <Input {...rest} form={form} />
    </div>
  )
}

export default FormInput
