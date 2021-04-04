import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import AnimatedDropdownArrow from '../../../../../components/elements/AnimatedDropdownArrow'
import catalogues from '../../../../../store/modules/catalogue'
import PhotoSlider from './PhotoSlider'

const Catalog = ({ catalog }) => {
  const history = useHistory()
  const [process, setProcess] = useState(false)
  if (!catalog) return null

  const isFirstSlide = catalogues.photos[0].pk === catalog.pk

  const prevSlide = () => {
    try {
      const cPhotoI = catalogues.photos?.findIndex((photo) => photo.pk === catalog.pk)
      if (cPhotoI !== -1) {
        const prevPhoto = catalogues.photos[cPhotoI - 1]
        history.push(`/app-catalog/${prevPhoto.pk}`)
      }
    } catch (e) {
      console.log("Error", e)
    }
  };

  const nextSlide = async () => {
    try {
      const cPhotoI = catalogues.photos?.findIndex((photo) => photo.pk === catalog.pk)
      if (cPhotoI !== -1) {
        const nextPhoto = catalogues.photos[cPhotoI + 1]
        if (nextPhoto) {
          history.push(`/app-catalog/${nextPhoto.pk}`)
        } else {
          setProcess(true)
          await catalogues.getTestImages();
          const nextPhoto = catalogues.photos[cPhotoI + 1]
          setProcess(false)
          if (nextPhoto) history.push(`/app-catalog/${nextPhoto.pk}`)
        }
      }
    } catch (e) {
      console.log("Error", e)
    }
  };

  return (
    <div className="p-details__wrapper">
      <h1 className="p-details__title">{catalog?.name}</h1>
      <p className="p-details__date">{catalog?.date?.toLocaleDateString()} год</p>
      <div className="p-details__imgWrapper">
        <button disabled={process} onClick={nextSlide} className="p-slider__btn p-slider__next">
          <AnimatedDropdownArrow />
        </button>

        {
          !isFirstSlide && (
            <button onClick={prevSlide} className="p-slider__btn p-slider__prev">
              <AnimatedDropdownArrow />
            </button>
          )
        }

        <PhotoSlider catalog={catalog} />
      </div>
    </div>
  )
}

export default Catalog