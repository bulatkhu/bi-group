import React from 'react'
import AnimatedDropdownArrow from '../../../../elements/AnimatedDropdownArrow'
import searching from '../../../../../store/modules/searching'
import { view } from '@risingstack/react-easy-state'
import FieldInfoSearching from './components/FieldInfoSearching'

const SearchResults = view(({ open, hasValue }) => {

  const onSearchByImage = async (url) => {
    searching.chosenAvatar = url
  }

  const onAddSearchTag = (tag) => searching.addSearchTag(tag)

  return (
    <div className={['f-p', open ? 'active' : null].join(' ')}>

      <div className="f-p__photos f-pPhoto">
        <div className="f-p__photoWrap scrollbar">
          {searching.result.profiles.length ? (
            searching.result.profiles?.map((item, index) => (
              <div
                onClick={() => onSearchByImage(item.image_url)}
                data-id={item.pk}
                className={
                  [
                    "f-pPhoto__item",
                    searching.chosenAvatar === item.image_url
                      ? "active" : null
                  ].join(' ')
                }
                key={item.pk}
              >
                <img src={item.image_url} alt={index}/>
              </div>
            ))
          ) : <FieldInfoSearching hasValue={hasValue} />}
        </div>
      </div>

      <ul className="f-p__results f-p-results">
        {searching.result.tags.length ? (
          searching.result.tags.map((item) => (
            <li
              data-id={item.pk}
              key={item.pk}
              onClick={() => onAddSearchTag(item.pk)}
              className={
                [
                  "f-p-results__item",
                  searching.chosenTags?.includes(item.pk)
                    ? "active" : null
                ].join(' ')
              }
            >
              {item.name}
              <span className="f-p-results__icon">
              <AnimatedDropdownArrow/>
            </span>
            </li>
          ))
        ) : <FieldInfoSearching hasValue={hasValue} />}
      </ul>
    </div>
  )
})

export default SearchResults