import React from 'react'

const Input = ({ type, form, ...rest }) => {

  if (form && rest.name) {
    return (
      <input ref={form?.register} {...rest} className="formInput" type="text"/>
    )
  }

  return (
    <input {...rest} className="formInput" type="text"/>
  )
}

export default Input