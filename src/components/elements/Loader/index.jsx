import React from 'react'
import './styles.scss'

const Loader = ({ text, small }) => {
  return (
    <div
      className={[
        'loader',
        'flex-center',
        small ? 'small' : null,
      ].join(' ')}
    >
      {text ? text : 'Загрузка...'}
    </div>
  )
}

export default Loader
