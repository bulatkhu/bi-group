import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import AnimatedDropdownArrow from '../../../../../components/elements/AnimatedDropdownArrow'
import catalogues from '../../../../../store/modules/catalogue'
import PhotoSlider from './PhotoSlider'

const Catalog = ({ catalog }) => {
  const history = useHistory()
  const [process, setProcess] = useState(false)
  if (!catalog) return null

  const catalogHasPhotos = catalogues.photos.length

  const isFirstSlide =
    catalogHasPhotos &&
    catalogues.photos?.[0]?.pk === catalog.pk

  const prevSlide = () => {
    try {
      const cPhotoI = catalogues.photos?.findIndex(
        (photo) => photo.pk === catalog.pk
      )
      if (cPhotoI !== -1) {
        const prevPhoto = catalogues.photos[cPhotoI - 1]
        history.push(`/app-catalog/${prevPhoto.pk}`)
      }
    } catch (e) {
      console.log('Error', e)
    }
  }

  const nextSlide = async () => {
    try {
      const cPhotoI = catalogues.photos?.findIndex(
        (photo) => photo.pk === catalog.pk
      )
      if (cPhotoI !== -1) {
        const nextPhoto = catalogues.photos[cPhotoI + 1]
        if (nextPhoto) {
          history.push(`/app-catalog/${nextPhoto.pk}`)
        } else {
          setProcess(true)
          await catalogues.getTestImages()
          const nextPhoto = catalogues.photos[cPhotoI + 1]
          setProcess(false)
          if (nextPhoto)
            history.push(`/app-catalog/${nextPhoto.pk}`)
        }
      }
    } catch (e) {
      console.log('Error', e)
    }
  }

  const tags =
    catalog?.tags && catalog.tags?.length ? (
      <span className="p-details__tags">
        {catalog.tags.map((tag) => tag.name).join(', ')}
      </span>
    ) : (
      'Теги были не найденно'
    )

  return (
    <div className="p-details__wrapper">
      <h1 className="p-details__title">
        <span>Теги:</span> {tags}
      </h1>
      <p className="p-details__date">{catalog?.year} год</p>
      <div className="p-details__imgWrapper">
        {catalogHasPhotos ? (
          <button
            disabled={process}
            onClick={nextSlide}
            className="p-slider__btn p-slider__next"
          >
            <AnimatedDropdownArrow />
          </button>
        ) : null}

        {!isFirstSlide && catalogHasPhotos ? (
          <button
            onClick={prevSlide}
            className="p-slider__btn p-slider__prev"
          >
            <AnimatedDropdownArrow />
          </button>
        ) : null}

        <PhotoSlider catalog={catalog} />
      </div>
    </div>
  )
}

export default Catalog
