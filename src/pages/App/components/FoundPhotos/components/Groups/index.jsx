import React from 'react'
import { view } from '@risingstack/react-easy-state'
import PhotoElement from '../PhotoElement'
import foundPhotos from '../../../../../../store/modules/foundPhotos'
import Loader from '../../../../../../components/elements/Loader'

const Groups = view(() => {

  const makePhotos = () => {
    const photos = foundPhotos.searchResult?.results

    if (photos && photos.length) {
      return (
        <div className="photosMain__masonry">
          {photos.map((photo, index) =>
            <PhotoElement
              id={photo.pk}
              key={index}
              year={photo.year}
              title={photo.name}
              img={photo.thumbnail}
              tags={photo.tags}
            />
          )}
        </div>
      )
    } if (foundPhotos.searching) {
      return <Loader text="Загрузка" />
    } else {
      return <p>Фото не найдены</p>
    }
  }

  return (
    <>
      {makePhotos()}
    </>
  )
})

export default Groups
