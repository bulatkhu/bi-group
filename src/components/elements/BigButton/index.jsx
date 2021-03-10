import React from 'react'
import './styles.scss'

const BigButton = ({ children, className, light, ...rest }) => {
  return (
    <button
      {...rest}
      className={["bigBtn", className, light ? 'light' : null].join(' ')}>
      {children}
    </button>
  )
}

export default BigButton