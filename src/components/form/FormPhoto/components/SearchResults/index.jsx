import React from 'react'
import AnimatedDropdownArrow from '../../../../elements/AnimatedDropdownArrow'
import searching from '../../../../../store/modules/searching'
import { view } from '@risingstack/react-easy-state'

const SearchResults = view(({ open, hasValue }) => {

  const FieldInfoSearching = () => {
    let message = "";

    if (hasValue && searching.loading) {
      message = "Not found"
    }
    if (!searching.loading && hasValue) {
      message = "Click search"
    }
    if (!hasValue) {
      message = "Input to search"
    }
    return <p>{message}</p>
  };

  return (
    <div className={['f-p', open ? 'active' : null].join(' ')}>

      <div className="f-p__photos f-pPhoto">
        <div className="f-p__photoWrap scrollbar">
          {searching.result.profiles.length ? (
            searching.result.profiles?.map((item, index) => (
              <div data-id={item.pk} className="f-pPhoto__item" key={item.pk}>
                <img src={item.image_url} alt={index}/>
              </div>
            ))
          ) : <FieldInfoSearching />}
        </div>
      </div>

      <ul className="f-p__results f-p-results">
        {searching.result.tags.length ? (
          searching.result.tags.map((item, index) => (
            <li data-id={item.pk} key={item.pk} className="f-p-results__item">
              {item.name}
              <span className="f-p-results__icon">
              <AnimatedDropdownArrow/>
            </span>
            </li>
          ))
        ) : <FieldInfoSearching />}
      </ul>
    </div>
  )
})

export default SearchResults