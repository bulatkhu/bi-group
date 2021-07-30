import React from 'react'
import { view } from '@risingstack/react-easy-state'
import PhotoElement from '../PhotoElement'
import foundPhotos from '../../../../../../store/modules/foundPhotos'
import Loader from '../../../../../../components/elements/Loader'
import InfiniteLoader from 'react-infinite-loader'

const Groups = view(() => {
  const makePhotos = () => {
    const photos = foundPhotos.searchResult?.results

    if (photos && photos.length) {
      const allPhotos = [
        ...photos,
        ...foundPhotos.pagination.photos,
      ]

      return (
        <div>
          <div className="photosMain__masonry">
            {allPhotos.map((photo, index) => (
              <PhotoElement
                id={photo.pk}
                key={index}
                year={photo.year}
                title={photo.name}
                img={photo.thumbnail}
                tags={photo.tags}
              />
            ))}
          </div>
          {foundPhotos.pagination.end ? (
            <p>Больше фотографий не найденно</p>
          ) : (
            <div>
              {!foundPhotos.pagination.process && (
                <InfiniteLoader
                  onVisited={() =>
                    foundPhotos.getMorePhotos()
                  }
                />
              )}
              <Loader />
            </div>
          )}
        </div>
      )
    }
    if (foundPhotos.searching) {
      return <Loader text="Загрузка" />
    } else {
      return <p>Фото не найдены</p>
    }
  }

  return <>{makePhotos()}</>
})

export default Groups
