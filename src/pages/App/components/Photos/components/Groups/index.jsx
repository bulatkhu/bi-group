import React from 'react'
import { view } from '@risingstack/react-easy-state'
import PhotoElement from '../PhotoElement'
import catalogues from '../../../../../../store/modules/catalogue'

const Groups = view(({ found }) => {

  const makePhotos = () => {
    if (!found) {
      return (
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
      )
    } else {
      const photos = catalogues.searchResult?.results

      if (photos && photos.length) {
        return (
          <div className="photosMain__photos">
            {photos.map((photo, index) =>
              <PhotoElement
                id={photo.pk}
                key={index}
                title={photo.name}
                img={photo.thumbnail}
              />
            )}
          </div>
        )
      } else {
        return <p>No photo found</p>
      }
    }
  }

  return (
    <>
      {makePhotos()}
    </>
  )
})

export default Groups