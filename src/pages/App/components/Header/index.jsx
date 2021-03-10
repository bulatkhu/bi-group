import React from 'react'
import { view } from '@risingstack/react-easy-state'
import Logo from './components/Logo'
import Info from './components/Info'
import auth from '../../../../store/modules/auth'
import './index.scss'


const Header = view(() => {

  return (
    <header className="header">
      <Logo />
      {auth.isAuth && <Info />}
    </header>
  )
})

export default Header