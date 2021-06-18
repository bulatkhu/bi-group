import React from 'react'
import {view} from '@risingstack/react-easy-state'
import PhotoElement from '../PhotoElement'
import catalogues from '../../../../../../store/modules/catalogue'
import sortPhotos from '../../../../../../helpers/sortPhotos'
import InfiniteLoader from 'react-infinite-loader/lib/InfiniteLoader'
import Loader from '../../../../../../components/elements/Loader'
// import { Masonry } from 'masonic'

const Groups = view(() => {
  const hasPhotos = catalogues.photos.length

  const makePhotos = () => {
    if (hasPhotos) {

      const sortedPhotos = sortPhotos(catalogues.photos)

      return (
        <>
          {sortedPhotos.map(({ year, photos: photosByTags }, index) => {

            return (
              <div key={index}>
                <p className="photosMain__date">{year} год</p>
                  <>
                    {Object.keys(photosByTags).map((photoTag, index) => {
                      const photos = photosByTags[photoTag];

                      return (
                        <div key={index} className="photosMain-photo">
                          <div className="photosMain-photo__tagWrapper">
                            <span className="photosMain-photo__tag">
                              Тег: <span>{photoTag}</span>
                            </span>
                          </div>
                          <div className="photosMain__masonry">
                            {photos.map((photo, index) => (
                              <PhotoElement key={index} {...photo} />
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </>

                {/*</div>*/}
                {
                  catalogues.process
                    ? <Loader />
                    : catalogues.error
                    ? <p className="error">catalogues.error</p>
                    : hasPhotos && catalogues.nextLink
                      ? <InfiniteLoader
                        onVisited={() => catalogues.getTestImages()}
                      />
                      : <p>No more photos</p>
                }
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
