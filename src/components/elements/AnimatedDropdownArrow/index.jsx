import React from 'react'
import "./index.scss"

const AnimatedDropdownArrow = ({ className }) => {
  return (
    <div className={['dropdown__arrow', className ? className : null].join(' ')}>
      <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.99999 5.172L11.95 0.222L13.364 1.636L6.99999 8L0.635986 1.636L2.04999 0.222L6.99999 5.172Z" fill="#03053D"/>
      </svg>
    </div>
  )
}

export default AnimatedDropdownArrow