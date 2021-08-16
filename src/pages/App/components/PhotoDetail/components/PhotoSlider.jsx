import React, { useState, useEffect } from 'react'
import ResizeImage from './ResizeImage'
import Loader from '../../../../../components/elements/Loader'
import { useParams } from 'react-router-dom'
import downloadImage from '../../../../../helpers/downloadImage'

const PhotoSlider = ({ catalog }) => {
  const params = useParams()

  const [slide, setSlide] = useState(0)
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!slides.length) {
      setSlide(0)
      setSlides([catalog.thumbnail, ...catalog.images])
    }
  }, [catalog, slides])
  const allImages = [catalog.thumbnail, ...catalog.images]

  useEffect(() => {
    if (slide !== 0) {
      setLoading(true)
    }
  }, [slide])

  useEffect(() => setSlide(0), [params.id])

  return (
    <div>
      <a
        href={allImages[slide]}
        rel="noreferrer"
        target="_blank"
        className="p-details__btn"
      >
        Публичная ссылка
      </a>

      <a
        onClick={(e) => {
          e.preventDefault()
          downloadImage(allImages[1], catalog.name)
        }}
        href={allImages[1]}
        rel="noreferrer"
        target="_blank"
        className="p-details__btn"
      >
        Скачать
      </a>
      <div className="photo-slider">
        {allImages.length > 1 &&
          allImages.map((item, index) => (
            <button
              key={index}
              onClick={() => setSlide(index)}
              className={['photo-slider__dot', slide === index && 'active'].join(' ')}
            />
          ))}
      </div>
      {loading && <Loader small>Загрузка...</Loader>}
      <ResizeImage setLoading={setLoading} img={allImages[slide]} alt={catalog?.name} />
    </div>
  )
}

export default PhotoSlider
