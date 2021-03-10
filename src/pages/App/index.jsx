import React, { useEffect, useRef } from 'react'
import Header from './components/Header/index'
import auth from '../../store/modules/auth'
import MakeRoutes from '../../router/MakeRoutes'
import Schema from '../../router/Schema'
import './styles.scss'

const App = () => {
  const init = useRef(false)

  useEffect(() => {
    if (!init.current) {
      auth.auth()
      init.current = true
    }
  },[])

  return (
    <div className="app">
      <Header />
      <MakeRoutes routes={Schema} />
    </div>
  )
}

export default App