import React from 'react'
import './styles.scss'

const BigButton = ({ children, className, light, tag, ...rest }) => {
  const NewTag = tag || 'button'

  return (
    <NewTag
      {...rest}
      className={["bigBtn", className, light ? 'light' : null].join(' ')}>
      {children}
    </NewTag>
  )
}

export default BigButton