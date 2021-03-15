import React, { useState } from 'react'
import { DateRange } from 'react-date-range';

const RangePicker = ({ open }) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const handleChangeRange = ({ range }) => {
    setStartDate(range.startDate)
    setEndDate(range.endDate)
  }

  return (
    <div className={['f-date', open ? 'active' : null].join(' ')}>
      <DateRange
        ranges={[
          {
            startDate,
            endDate,
            key: 'range',
          }
        ]}
        onChange={handleChangeRange}
      />
    </div>
  )
}

export default RangePicker