import React from 'react'
import { view } from '@risingstack/react-easy-state'
import PhotoElement from '../PhotoElement'
import catalogues from '../../../../../../store/modules/catalogue'

const Groups = view(({ found }) => {

  const hasPhotos = Object.keys(catalogues.photos).length

  console.log('hasPhotos', hasPhotos)

  return (
    <>
      {hasPhotos ? (
        <>
          {Object.keys(catalogues.photos).map((key, index) => {
            const photo = catalogues.photos[key]

            console.log('photo', photo)

            return (
              <>
                <p className="photosMain__date">{key} год</p>
                <div className="photosMain__photos">
                  {catalogues.photos[key].map((photo, index) => (
                    <PhotoElement
                      id={photo.pk}
                      key={index}
                      title={photo.name}
                      img={photo.thumbnail}
                    />
                  ))}
                </div>
              </>
            )
           })}
        </>
      ) : <p>No photo</p>}
    </>
  )
})

export default Groups