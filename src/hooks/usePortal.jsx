import React from 'react'
import {createPortal} from 'react-dom'

const UsePortal = ({ children }) =>
  createPortal(<>{children}</>, document.getElementById('root-modal'))


export default UsePortal
