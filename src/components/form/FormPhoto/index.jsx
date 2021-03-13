import React, { useState } from 'react'
import SearchIcon from '../../SvgIcons/SearchIcon'
import AnimatedDropdownArrow from '../../elements/AnimatedDropdownArrow'
import { IconUploadImg } from '../../Icons'
import "./styles.scss"
import UsePortal from '../../../hooks/usePortal'
// import ModalOverlay from '../../modals/ModalOverlay'
// import UsePortal from '../../../hooks/usePortal'

const mokeImages = [
  { img: '/images/mokes/house-photo1.jpg' },
  { img: '/images/mokes/house-photo1.jpg' },
  { img: '/images/mokes/house-photo1.jpg' },
  { img: '/images/mokes/house-photo1.jpg' },
  { img: '/images/mokes/house-photo1.jpg' },
  { img: '/images/mokes/house-photo1.jpg' },
  // { img: '/images/mokes/house-photo1.jpg' },
  // { img: '/images/mokes/house-photo1.jpg' },
  // { img: '/images/mokes/house-photo1.jpg' },
  // { img: '/images/mokes/house-photo1.jpg' },
  // { img: '/images/mokes/house-photo1.jpg' },
  // { img: '/images/mokes/house-photo1.jpg' },
  // { img: '/images/mokes/house-photo1.jpg' },
  // { img: '/images/mokes/house-photo1.jpg' },
  // { img: '/images/mokes/house-photo1.jpg' },
  // { img: '/images/mokes/house-photo1.jpg' },
]

const FormPhoto = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="fromPhoto">
      {
        open && (
          <UsePortal>
            <div
              onClick={() => setOpen(false)}
              className="fromPhoto__bg"
            />
          </UsePortal>
        )
      }
      <div className="fromPhoto__wrap">
        <label htmlFor="value" className="fromPhoto__el1">
          <SearchIcon/>
          <input
            onFocus={() => setOpen(true)}
            id="value"
            name="value"
            placeholder="Search by person name or event" type="text"/>
        </label>
        <button className="fromPhoto__el2">
          <div className="datePicker">
          <span className="datePicker__name">
              Choose date
          </span>
            <AnimatedDropdownArrow/>
          </div>
        </button>
      </div>
      <button className="fromPhoto__upload">
        <IconUploadImg/>
      </button>
      <div className={['f-p', open ? 'active' : null].join(' ')}>

        <div className="f-p__photos f-pPhoto">
          <div className="f-p__photoWrap scrollbar">
            {mokeImages.map((item, index) => (
              <div className="f-pPhoto__item" key={index}>
                <img src={item.img} alt={index}/>
              </div>
            ))}
          </div>
        </div>

        <ul className="f-p__results f-p-results">
          <li className="f-p-results__item">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam
            <span className="f-p-results__icon">
              <AnimatedDropdownArrow/>
            </span>
          </li>
          <li className="f-p-results__item">
            Lorem ipsum dolor sit amet
            <span className="f-p-results__icon">
              <AnimatedDropdownArrow/>
            </span>
          </li>
          <li className="f-p-results__item">
            Lorem ipsum dolor
            <span className="f-p-results__icon">
              <AnimatedDropdownArrow/>
            </span>
          </li>
          <li className="f-p-results__item">
            Lorem ipsum dolor sit amet, consectetur
            <span className="f-p-results__icon">
              <AnimatedDropdownArrow/>
            </span>
          </li>
        </ul>

        <ul className="f-p__results f-p-results">
          <li className="f-p-results__item">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam
            <span className="f-p-results__icon">
              <AnimatedDropdownArrow/>
            </span>
          </li>
          <li className="f-p-results__item">
            Lorem ipsum dolor sit amet
            <span className="f-p-results__icon">
              <AnimatedDropdownArrow/>
            </span>
          </li>
        </ul>

      </div>
    </div>
  )
}

export default FormPhoto