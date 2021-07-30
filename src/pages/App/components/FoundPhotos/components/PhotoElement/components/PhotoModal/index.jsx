import React from 'react'
import { IconClose } from '../../../../../../../../components/Icons'

const PhotoModal = ({ setOpen, img }) => {
  return (
    <div className="pModal">
      <div
        className="pModal__img"
        style={{ marginBottom: 0 }}
      >
        <button
          onClick={() => setOpen(false)}
          className="pModal__close"
        >
          <IconClose />
        </button>
        <span className="pModal__imgWrap flex-center">
          <img src={img} alt={img} />
        </span>
      </div>
    </div>
  )
}

export default PhotoModal
