import React from 'react'
import { DateRange } from 'react-date-range'
import { view } from '@risingstack/react-easy-state'
import foundPhotos from '../../../../../store/modules/foundPhotos'

const RangePicker = view(({ open }) => {
  const handleChangeRange = ({ range }) => {
    foundPhotos.searchDateStart = range.startDate
    foundPhotos.searchDateEnd = range.endDate
  }

  return (
    <div
      className={['f-date', open ? 'active' : null].join(
        ' '
      )}
    >
      <DateRange
        ranges={[
          {
            startDate:
              foundPhotos.searchDateStart || new Date(),
            endDate:
              foundPhotos.searchDateEnd || new Date(),
            key: 'range',
          },
        ]}
        onChange={handleChangeRange}
      />
    </div>
  )
})

export default RangePicker
