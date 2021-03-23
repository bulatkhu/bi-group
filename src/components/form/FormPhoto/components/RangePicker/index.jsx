import React from 'react'
import { DateRange } from 'react-date-range';
import { view } from '@risingstack/react-easy-state'
import catalogues from '../../../../../store/modules/catalogue'

const RangePicker = view(({ open }) => {
  const handleChangeRange = ({ range }) => {
    catalogues.searchDateStart = range.startDate
    catalogues.searchDateEnd = range.endDate
  }

  return (
    <div className={['f-date', open ? 'active' : null].join(' ')}>
      <DateRange
        ranges={[
          {
            startDate: catalogues.searchDateStart || new Date(),
            endDate: catalogues.searchDateEnd || new Date(),
            key: 'range',
          }
        ]}
        onChange={handleChangeRange}
      />
    </div>
  )
})

export default RangePicker