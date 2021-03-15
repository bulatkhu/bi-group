import React from 'react'
import { view } from '@risingstack/react-easy-state'
import PhotoElement from '../PhotoElement'
import catalogues from '../../../../../../store/modules/catalogue'

const Groups = view(() => {

  return (
    <>
      {
        catalogues.photos.length ? (
          <div className="photosMain__photos">
            {catalogues.photos.map((photo, index) =>
              <PhotoElement
                id={photo.pk}
                key={index}
                title={photo.name}
                img={photo.thumbnail}
              />
            )}
          </div>
        ) : <p>No photo</p>
      }
    </>
  )
})

export default Groups