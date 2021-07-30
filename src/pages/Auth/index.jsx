import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import auth from '../../store/modules/auth'
import FormInput from '../../components/form/FormInput'
import BigButton from '../../components/elements/BigButton'
import classes from './styles.module.scss'
import clsx from 'clsx'

const Auth = () => {
  const [process, setProcess] = useState(false)
  const [error, setError] = useState('')
  const history = useHistory()

  const form = useForm({
    defaultValues: {
      username: 'ext-kudainazarov@bi.group',
      password: 'Alex123!Alex123!',
    },
  })

  const onFormSubmit = async (data) => {
    setProcess(true)
    setError('')
    const res = await auth.login(data)
    if (res === true) {
      auth.auth()
      history.push('/app-catalogues/catalogues')
      console.log('res', res)
    } else {
      setError(res)
    }
    setProcess(false)
  }

  return (
    <div
      className={classes.auth}
      style={{
        backgroundImage: 'url(/images/auth/bg.jpg)',
      }}
    >
      <form className={classes.auth__wrapper}>
        <div className={classes.auth__top}>
          <h2 className={classes.auth__title}>
            Авторизоваться
          </h2>
          <p className={classes.auth__subTitle}>
            Войдите для просмота фотогалереи
          </p>
        </div>
        <div
          className={clsx(
            classes.auth__middle,
            classes.authMid
          )}
        >
          <label
            htmlFor="email"
            className={classes.authMid__label}
          >
            Корпоративная почта
          </label>
          <FormInput
            form={form}
            placeholder="Введите данные"
            name="username"
            id="username"
          />
          <div style={{ height: 16 }} />
          <label
            htmlFor="password"
            className={classes.authMid__label}
          >
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
        {error && <p className={classes.error}>{error}</p>}
        <div className={classes.auth__bottom}>
          <BigButton
            disabled={process}
            onClick={form.handleSubmit(onFormSubmit)}
            style={{ width: '100%' }}
          >
            {process ? 'Загрузка...' : 'Войти'}
          </BigButton>
        </div>
      </form>
    </div>
  )
}

export default Auth
