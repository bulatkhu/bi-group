import React, { useState } from 'react'
import UsePortal from '../../../../../../hooks/usePortal'
import './styles.scss'
import ModalOverlay from '../../../../../../components/modals/ModalOverlay'
import PhotoModal from './components/PhotoModal'

const PhotoElement = ({ img, title, id }) => {
  const [open, setOpen] = useState(false)

  const onShowModal = () => {
    setOpen(true)
  }

  return (
    <>
      {
        open && (
          <UsePortal>
            <ModalOverlay
              setOpen={setOpen}
            >
              <PhotoModal
                setOpen={setOpen}
                id={id}
              />
            </ModalOverlay>
          </UsePortal>
        )
      }
      <div
        onClick={onShowModal}
        data-id={id}
        className="photoElement"
      >
        <img src={img} alt={title}/>
        <p className="photoElement__title">{title}</p>
      </div>
    </>
  )
}

export default PhotoElement