import React, { useState, useEffect } from 'react'
import UsePortal from '../../../hooks/usePortal'
import { useMediaQuery } from 'react-responsive'
// import DayPicker from 'react-day-picker'
import SearchIcon from '../../SvgIcons/SearchIcon'
import AnimatedDropdownArrow from '../../elements/AnimatedDropdownArrow'
import { IconUploadImg } from '../../Icons'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import "./styles.scss"
import { useForm } from 'react-hook-form'
import ImageUploader from './components/ImageUploader'
import SearchResults from './components/SearchResults'
import RangePicker from './components/RangePicker'

const FormPhoto = () => {
  const [openValue, setOpenValue] = useState(false)
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [openImgUploader, setOpenImgUploader] = useState(false)
  const preMobile = useMediaQuery({ query: '(max-width: 992px)' })

  const form = useForm({
    defaultValues: {
      image: null,
      value: '',
    },
  })

  useEffect(() => {
    if (openValue) {
      setOpenDatePicker(false)
      setOpenImgUploader(false)
    } else if (openDatePicker) {
      setOpenValue(false)
      setOpenImgUploader(false)
    } else if (openImgUploader) {
      setOpenValue(false)
      setOpenDatePicker(false)
    }
  },[openValue, openDatePicker, openImgUploader])

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
        <label onClick={() => {
          closeEveryThing()
          setOpenValue(true)
        }} htmlFor="value" className="fromPhoto__el1">
          <SearchIcon/>
          <input
            ref={form.register}
            id="value"
            name="value"
            placeholder={
              !preMobile
                ? "Search by person name or event"
                : "Search"
            } type="text"/>
        </label>
        <button onClick={() => {
          closeEveryThing()
          setOpenDatePicker(prev => !prev)
        }} className="fromPhoto__el2">
          <div className="datePicker">
          <span className="datePicker__name">
              Choose date
          </span>
            <AnimatedDropdownArrow
              className={openDatePicker ? 'active' : null}
            />
          </div>
        </button>
      </div>
      <button
        onClick={() => {
          closeEveryThing()
          setOpenImgUploader(true)
        }}
        className="fromPhoto__upload"
      >
        <IconUploadImg/>
      </button>
      <ImageUploader form={form} open={openImgUploader} />
      <RangePicker open={openDatePicker} />
      <SearchResults form={form} open={openValue} />
    </div>
  )
}

export default FormPhoto