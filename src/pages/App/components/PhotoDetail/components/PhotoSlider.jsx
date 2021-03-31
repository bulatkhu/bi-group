import React, { useState, useEffect } from "react";
import ResizeImage from './ResizeImage'
import Loader from '../../../../../components/elements/Loader'
import {useParams} from 'react-router-dom'

const PhotoSlider = ({ catalog }) => {
  const params = useParams();

  const [slide, setSlide] = useState(0)
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slides.length) {
      setSlide(0)
      setSlides([catalog.thumbnail, ...catalog.images])
    }
  }, [catalog, slides])
  const allImages = [catalog.thumbnail, ...catalog.images]

  useEffect(() => {
    setLoading(true)
  }, [slide])

  useEffect(() => setSlide(0), [params.id])

  return (
    <div>
      <div className="photo-slider">
        {allImages.map((item, index) => (
          <button
            key={index}
            onClick={() => setSlide(index)}
            className={["photo-slider__dot", slide === index && "active"].join(' ')}
          />
        ))}
      </div>
      {loading && <Loader small>...Loading</Loader>}
      <ResizeImage setLoading={setLoading} img={allImages[slide]} alt={catalog?.name}/>
    </div>
  );
};

export default PhotoSlider;