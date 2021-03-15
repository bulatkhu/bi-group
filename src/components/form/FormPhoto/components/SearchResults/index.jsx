import React from 'react'
import AnimatedDropdownArrow from '../../../../elements/AnimatedDropdownArrow'

const mokeImages = [
  { img: '/images/mokes/house-photo1.jpg' },
  { img: '/images/mokes/house-photo1.jpg' },
  { img: '/images/mokes/house-photo1.jpg' },
  { img: '/images/mokes/house-photo1.jpg' },
  { img: '/images/mokes/house-photo1.jpg' },
  { img: '/images/mokes/house-photo1.jpg' },
]

const SearchResults = ({ open }) => {
  return (
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
  )
}

export default SearchResults