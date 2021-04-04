import React from 'react'
import {view} from '@risingstack/react-easy-state'
import PhotoElement from '../PhotoElement'
import catalogues from '../../../../../../store/modules/catalogue'
import sortPhotos from '../../../../../../helpers/sortPhotos'
import InfiniteLoader from 'react-infinite-loader/lib/InfiniteLoader'
import Loader from '../../../../../../components/elements/Loader'
// import { Masonry } from 'masonic'

const Groups = view(() => {
  const hasPhotos = catalogues.photos

  const makePhotos = () => {
    if (hasPhotos) {

      const sortedPhotos = sortPhotos(catalogues.photos)

      return (
        <>
          {Object.keys(sortedPhotos).map((key, index) => {
            const photos = sortedPhotos[key]

            return (
              <div key={index}>
                <p className="photosMain__date">{key} год</p>
                <div className="photosMain__masonry">
                  {photos.map((photo, index) => (
                    <PhotoElement key={index} {...photo} />
                  ))}
                </div>
                {hasPhotos && catalogues.nextLink ? (
                  <InfiniteLoader onVisited={() => catalogues.getTestImages()}/>
                ) : <p>No more photos</p>}
                {catalogues.process && <Loader />}
              </div>
            )
          })}
        </>
      )
    } else {
      return <p>No photo</p>
    }
  }

  return (
    <>
      {makePhotos()}
    </>
  )
})

export default Groups