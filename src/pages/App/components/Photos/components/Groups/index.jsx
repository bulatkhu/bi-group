import React from 'react'
import {view} from '@risingstack/react-easy-state'
import PhotoElement from '../PhotoElement'
import catalogues from '../../../../../../store/modules/catalogue'
import sortPhotos from '../../../../../../helpers/sortPhotos'
import Masonry from 'react-masonry-css'
import InfiniteLoader from 'react-infinite-loader/lib/InfiniteLoader'
import catalogue from '../../../../../../store/modules/catalogue'
import Loader from '../../../../../../components/elements/Loader'

const breakpointColumnsObj = {
  default: 5,
  1600: 5,
  1400: 4,
  1100: 3,
  700: 2,
  500: 1
};

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
                <Masonry breakpointCols={breakpointColumnsObj} columnClassName="my-masonry-grid_column"
                         className="my-masonry-grid">
                  {photos.map((photo, index) => {
                    return (
                      <PhotoElement
                        id={photo.pk}
                        key={index}
                        title={photo.name}
                        img={photo.thumbnail}
                      />
                    )
                  })}
                </Masonry>
                <InfiniteLoader onVisited={() => catalogue.getTestImages()}/>
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