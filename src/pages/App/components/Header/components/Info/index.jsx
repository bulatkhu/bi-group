import React, { useState } from 'react'
import { view } from '@risingstack/react-easy-state'
import AnimatedDropdownArrow from '../../../../../../components/elements/AnimatedDropdownArrow'
import auth from '../../../../../../store/modules/auth'
import './styles.scss'

const Info = view(() => {
  const [open, setOpen] = useState(false)

  return (
    <div className="profile-info__wrap">
      <button
        onClick={() => setOpen(p => !p)}
        className="profile-info flex-center"
      >
        <AnimatedDropdownArrow className={['profile-info__arrow', open ? 'open' : null].join(' ')}/>
        <span className="profile-info__name">{auth.user?.name || 'No name'}</span>
        <span className="profile-info__avatar">
        {
          auth.user?.avatar ? (
            <img src={auth.user.avatar} alt="avatar"/>
          ) : (
            <p className="profile-info__noPhoto flex-center">No photo</p>
          )
        }
      </span>
      </button>
      <div className={['profile-info__dropdown p-i__dropdown', open ? 'active' : null].join(' ')}>

      </div>
    </div>
  );
})

export default Info