import React from 'react'
import { view } from '@risingstack/react-easy-state'
import PhotoElement from '../PhotoElement'
import foundPhotos from '../../../../../../store/modules/foundPhotos'

const Groups = view(() => {

  const makePhotos = () => {
    const photos = foundPhotos.searchResult?.results

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

  return (
    <>
      {makePhotos()}
    </>
  )
})

export default Groups