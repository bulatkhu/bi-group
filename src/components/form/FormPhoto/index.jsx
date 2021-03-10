import React from 'react'
import "./styles.scss"
import SearchIcon from '../../SvgIcons/SearchIcon'
import AnimatedDropdownArrow from '../../elements/AnimatedDropdownArrow'

const FormPhoto = () => {
  return (
    <div className="fromPhoto">

      <label htmlFor="value" className="fromPhoto__el1">
        <SearchIcon />
        <input id="value" name="value" placeholder="Search by person name or event" type="text"/>

      </label>
      <div className="fromPhoto__el2">
        <div className="datePicker">
          <span className="datePicker__name">
              Choose date
          </span>
          <AnimatedDropdownArrow />
        </div>
      </div>

    </div>
  )
}

export default FormPhoto