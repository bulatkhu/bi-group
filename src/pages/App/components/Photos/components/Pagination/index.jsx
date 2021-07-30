import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { view } from '@risingstack/react-easy-state'
import catalogues from '../../../../../../store/modules/catalogue'

const initialLinks = [0, 1, 2, 3, 4, 5, 6]

const Pagination = view(({ page }) => {
  const [links, setLinks] = useState(initialLinks)

  useEffect(() => {
    if (+page === links.length - 1 && catalogues.nextLink) {
      setLinks((prev) => [...prev, links.length])
    } else if (
      +page > links.length &&
      catalogues.nextLink
    ) {
      const offset = +page - links.length
      setLinks((prev) => [
        ...prev,
        links.length,
        links.length + 1,
      ])
      for (let key = 0; offset > key; key++) {
        setLinks((prev) => [...prev, links.length + key])
      }
    }
    // eslint-disable-next-line
  }, [page, links, catalogues.nextLink])

  return (
    <div className="photos__pagination">
      {links.map((item, index) => {
        return (
          <NavLink
            key={index}
            to={`/app-catalogues/${index}`}
            className={[
              'photos__btn',
              index === +page ? 'active' : null,
            ].join(' ')}
          >
            {index}
          </NavLink>
        )
      })}
    </div>
  )
})

export default Pagination
