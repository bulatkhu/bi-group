import React, { useState } from 'react'
import { view } from '@risingstack/react-easy-state'
import { useHistory } from 'react-router-dom'
import AnimatedDropdownArrow from '../../../../../../components/elements/AnimatedDropdownArrow'
import auth from '../../../../../../store/modules/auth'
import BigButton from '../../../../../../components/elements/BigButton'
import './styles.scss'

const Info = view(() => {
  const history = useHistory()
  const [open, setOpen] = useState(false)

  return (
    <div className="profile-info__wrap">
      <button
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        onClick={() => setOpen((p) => !p)}
        className="profile-info flex-center"
      >
        <AnimatedDropdownArrow
          className={[
            'profile-info__arrow',
            open ? 'open' : null,
          ].join(' ')}
        />
        <span className="profile-info__name">
          {auth.user?.first_name || 'No name'}
        </span>
        <span className="profile-info__avatar">
          {auth.user?.avatar ? (
            <img src={auth.user.avatar} alt="avatar" />
          ) : (
            <p className="profile-info__noPhoto flex-center">
              Нет фото
            </p>
          )}
        </span>
      </button>
      <div
        className={[
          'profile-info__dropdown p-d',
          open ? 'active' : null,
        ].join(' ')}
      >
        <div className="p-d__wrapper">
          <div className="p-d__group">
            <p className="p-d__label">ФИО</p>
            <p className="p-d__info">
              {auth.user?.first_name} {auth.user?.last_name}
            </p>
          </div>

          {/*<div className="p-d__group">*/}
          {/*  <p className="p-d__label">Должность</p>*/}
          {/*  <p className="p-d__info">{auth.user?.state} </p>*/}
          {/*</div>*/}

          {/*<div className="p-d__group">*/}
          {/*  <p className="p-d__label">День рождения</p>*/}
          {/*  <p className="p-d__info">13 September 2000</p>*/}
          {/*</div>*/}

          <BigButton
            onClick={() => {
              auth.logout()
              history.push('/auth')
            }}
            style={{
              padding: '6px 10px',
              fontWeight: 600,
              fontSize: 18,
              width: '100%',
            }}
          >
            Выйти
          </BigButton>
        </div>
      </div>
    </div>
  )
})

export default Info
