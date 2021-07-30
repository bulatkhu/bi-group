import React, { useState } from 'react'
import {
  IconScaleMinus,
  IconScalePlus,
} from '../../../../../../components/Icons'
import CustomImageFallback from '../../../../../../components/elements/CustomImageFallback'

const ResizeImage = ({ img, alt, setLoading }) => {
  const [scale, setScale] = useState(1)

  return (
    <>
      <div className="p-details__img">
        <div className="p-details__imgWrapper">
          {scale !== 1 && (
            <button className="p-details__scaleValue flex-center">
              {(scale * 100).toFixed(0)}%
            </button>
          )}
          <button
            className="p-details__btnScale plus flex-center"
            onClick={() => setScale((prev) => prev + 0.1)}
          >
            <IconScalePlus />
          </button>
          <button
            className="p-details__btnScale flex-center"
            onClick={() => setScale((prev) => prev - 0.1)}
          >
            <IconScaleMinus />
          </button>
          <CustomImageFallback
            onLoad={() => setLoading(false)}
            src={img}
            style={{ transform: `scale(${scale})` }}
            alt={alt}
          />
        </div>
      </div>
    </>
  )
}

export default ResizeImage
