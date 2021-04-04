import React from 'react'
import searching from '../../../../../../store/modules/searching'
import { view } from '@risingstack/react-easy-state'

const FieldInfoSearching = view(({hasValue}) => {
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
});

export default FieldInfoSearching