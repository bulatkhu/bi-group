import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { fakeApi } from '../../store/api'
import auth from '../../store/modules/auth'
import FormInput from '../../components/form/FormInput'
import BigButton from '../../components/elements/BigButton'
import './styles.scss'

const Auth = () => {
  const history = useHistory()

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onFormSubmit = async (data) => {
    console.log('data', data)
    await fakeApi(500)
    sessionStorage.setItem('token', 'jwt')
    await auth.auth()
    history.push('/app-catalogues')
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
          <FormInput form={form} placeholder="Введите данные" name="email" id="email" />
          <div style={{ height: 16 }}/>
          <label htmlFor="password" className="authMid__label">
            Пароль
          </label>
          <FormInput form={form} placeholder="Введите данные" type="password" name="password" id="password" />
        </div>
        <div className="auth__bottom authBottom">
          <BigButton onClick={form.handleSubmit(onFormSubmit)} style={{ width: "100%" }} >Войти</BigButton>
        </div>
      </form>
    </div>
  )
}

export default Auth