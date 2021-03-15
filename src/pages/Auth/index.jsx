import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import auth from '../../store/modules/auth'
import FormInput from '../../components/form/FormInput'
import BigButton from '../../components/elements/BigButton'
import './styles.scss'

const Auth = () => {
  const [process, setProcess] = useState(false)
  const [error, setError] = useState("")
  const history = useHistory()

  const form = useForm({
    defaultValues: {
      username: "ext-kudainazarov@bi.group",
      password: "x386F%bZHmst",
    }
  })

  const onFormSubmit = async (data) => {
    setProcess(true)
    setError("")
    const res = await auth.login(data)
    if (res === true) {
      auth.auth()
      history.push('/app-catalogues')
      console.log('res', res)
    } else {
      setError(res)
    }
    setProcess(false)
  }


  return (
    <div
      className="auth"
      style={{
        backgroundImage: "url(/images/auth/bg.jpg)",
      }}
    >
      <form className="auth__wrapper">
        <div className="auth__top">
          <h2 className="auth__title">Авторизоваться</h2>
          <p className="auth__subTitle">Войдите для просмота фотогалереи</p>
        </div>
        <div className="auth__middle authMid">
          <label htmlFor="email" className="authMid__label">
            Корпоративная почта
          </label>
          <FormInput
            form={form}
            placeholder="Введите данные"
            name="username"
            id="username"
          />
          <div style={{ height: 16 }}/>
          <label htmlFor="password" className="authMid__label">
            Пароль
          </label>
          <FormInput
            form={form}
            placeholder="Введите данные"
            type="password"
            name="password"
            id="password"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="auth__bottom authBottom">
          <BigButton
            disabled={process}
            onClick={form.handleSubmit(onFormSubmit)}
            style={{ width: "100%" }}
          >
            {process ? "Загрузка..." : "Войти"}
          </BigButton>
        </div>
      </form>
    </div>
  )
}

export default Auth