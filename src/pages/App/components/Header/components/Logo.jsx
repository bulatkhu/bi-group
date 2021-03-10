import React from 'react'
import { Link } from 'react-router-dom'
import { view } from '@risingstack/react-easy-state'
import auth from '../../../../../store/modules/auth'

const Logo = view(() => {
  const { isAuth } = auth

  return (
    <Link
      to={isAuth ? '/app-catalogue' : '/auth'}
      className="header__logo flex-center"
    >
      <img src="/images/header/logo.png" alt="Logo"/>
    </Link>
  )
})

export default Logo