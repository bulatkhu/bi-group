import React, { useState } from "react";
import {IconNoEye} from '../../../Icons'

const Input = ({ type, form, ...rest }) => {
  const [show, setShow] = useState(false)

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => setShow(prev => !prev)}
        className="formInput__noEye"
      >
        <IconNoEye/>
      </div>
      <input ref={form?.register} {...rest} className="formInput formInput__pass" type={show ? 'text' : 'password'}/>
    </div>
  )
}

export default Input