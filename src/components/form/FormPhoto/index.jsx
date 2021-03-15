import React, { useState } from 'react'
import UsePortal from '../../../hooks/usePortal'
// import DayPicker from 'react-day-picker'
import SearchIcon from '../../SvgIcons/SearchIcon'
import AnimatedDropdownArrow from '../../elements/AnimatedDropdownArrow'
import { IconUploadImg } from '../../Icons'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import "./styles.scss"
import { useForm } from 'react-hook-form'
import ImageUploader from './components/ImageUploader'

const mokeImages = [
  { img: '/images/mokes/house-photo1.jpg' },
  { img: '/images/mokes/house-photo1.jpg' },
  { img: '/images/mokes/house-photo1.jpg' },
  { img: '/images/mokes/house-photo1.jpg' },
  { img: '/images/mokes/house-photo1.jpg' },
  { img: '/images/mokes/house-photo1.jpg' },
]

const FormPhoto = () => {
  const [openValue, setOpenValue] = useState(false)
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [openImgUploader, setOpenImgUploader] = useState(false)

  const form = useForm({
    defaultValues: {
      image: null,
    },
  })

  const closeEveryThing = () => {
    setOpenDatePicker(false)
    setOpenValue(false)
    setOpenImgUploader(false)
  }

  return (
    <div className="fromPhoto">
      {
        (openValue || openDatePicker || openImgUploader) && (
          <UsePortal>
            <div
              onClick={closeEveryThing}
              className="fromPhoto__bg"
            />
          </UsePortal>
        )
      }
      <div className="fromPhoto__wrap">
        <label htmlFor="value" className="fromPhoto__el1">
          <SearchIcon/>
          <input
            onFocus={() => setOpenValue(true)}
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
      <button
        onClick={() => setOpenImgUploader(true)}
        className="fromPhoto__upload"
      >
        <IconUploadImg/>
      </button>
      <ImageUploader form={form} open={openImgUploader} />
      <div className="f-date">
        {/*<DateRangePicker*/}
        {/*  date={new Date()}*/}
        {/*  onChange={handleSelect}*/}
        {/*/>*/}
        {/*<DayPicker/>*/}
      </div>
      <div className={['f-p', openValue ? 'active' : null].join(' ')}>

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