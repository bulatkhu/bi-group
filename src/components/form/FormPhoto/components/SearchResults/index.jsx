import React, { useEffect } from 'react'
import AnimatedDropdownArrow from '../../../../elements/AnimatedDropdownArrow'
import searching from '../../../../../store/modules/searching'
import { useDebounce } from '../../../../../hooks/useDebounce'
import { view } from '@risingstack/react-easy-state'

// const mokeImages = [
//   { img: '/images/mokes/house-photo1.jpg' },
//   { img: '/images/mokes/house-photo1.jpg' },
//   { img: '/images/mokes/house-photo1.jpg' },
//   { img: '/images/mokes/house-photo1.jpg' },
//   { img: '/images/mokes/house-photo1.jpg' },
//   { img: '/images/mokes/house-photo1.jpg' },
// ]

const SearchResults = view(({ open, form }) => {
  const value = form.watch('value')
  const debouncedValue = useDebounce(value, 700)

  const hasValue = debouncedValue && debouncedValue.trim()

  useEffect(() => {
    if (hasValue) {
      searching.searchByValue(debouncedValue)
    } else {
      searching.clearModule()
    }
  }, [hasValue, debouncedValue])

  console.log('result', searching.result.tags)

  return (
    <div className={['f-p', open ? 'active' : null].join(' ')}>

      <div className="f-p__photos f-pPhoto">
        <div className="f-p__photoWrap scrollbar">
          {searching.result.profiles.length ? (
            searching.result.profiles?.map((item, index) => (
              <div className="f-pPhoto__item" key={item}>
                <img src={item.image_url} alt={index}/>
              </div>
            ))
          ) : <p>{hasValue ? "Not found" : "Input to search"}</p>}
        </div>
      </div>

      <ul className="f-p__results f-p-results">
        {searching.result.tags.length ? (
          searching.result.tags.map((item) => (
            <li key={item.pk} className="f-p-results__item">
              {item.name}
              <span className="f-p-results__icon">
              <AnimatedDropdownArrow/>
            </span>
            </li>
          ))
        ) : <p>{hasValue ? "Not found" : "Input to search"}</p>}
      </ul>

      {/*<ul className="f-p__results f-p-results">*/}
      {/*  <li className="f-p-results__item">*/}
      {/*    Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam*/}
      {/*    <span className="f-p-results__icon">*/}
      {/*        <AnimatedDropdownArrow/>*/}
      {/*      </span>*/}
      {/*  </li>*/}
      {/*  <li className="f-p-results__item">*/}
      {/*    Lorem ipsum dolor sit amet*/}
      {/*    <span className="f-p-results__icon">*/}
      {/*        <AnimatedDropdownArrow/>*/}
      {/*      </span>*/}
      {/*  </li>*/}
      {/*</ul>*/}

    </div>
  )
})

export default SearchResults