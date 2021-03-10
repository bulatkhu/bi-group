import React, { useEffect, useRef } from 'react'
import { view } from '@risingstack/react-easy-state'
import PhotoElement from '../PhotoElement'
import catalogues from '../../../../../../store/modules/catalogue'

const Groups = view(() => {
  const init = useRef(false)

  useEffect(() => {
    if (!init.current) {
      catalogues.fetchCatalog()
      init.current = true
    }
    console.log('rerender')
  }, [])

  return (
    <>
      {
        catalogues.photos.length ? (
          <div className="photosMain__photos">
            {catalogues.photos.map((photo, index) =>
              <PhotoElement
                id={photo.id}
                key={index}
                title={photo.title}
                img={photo.img}
              />
            )}
          </div>
        ) : <p>No photo</p>
      }
    </>
  )
})

export default Groups