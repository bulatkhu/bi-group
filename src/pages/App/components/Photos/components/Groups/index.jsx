import React from 'react'
import { view } from '@risingstack/react-easy-state'
import PhotoElement from '../PhotoElement'
import catalogues from '../../../../../../store/modules/catalogue'

const Groups = view(() => {
  const hasPhotos = Object.keys(catalogues.sortedByYear).length

  return (
    <>
      {hasPhotos ? (
        <>
          {Object.keys(catalogues.sortedByYear).map((key, index) => {
            const photo = catalogues.sortedByYear[key]
            return (
              <div key={index}>
                <p className="photosMain__date">{key} год</p>
                <div className="photosMain__photos">
                  {photo.map((photo, index) => (
                    <PhotoElement
                      id={photo.pk}
                      key={index}
                      title={photo.name}
                      img={photo.thumbnail}
                    />
                  ))}
                </div>
              </div>
            )
           })}
        </>
      ) : <p>No photo</p>}
    </>
  )
})

export default Groups