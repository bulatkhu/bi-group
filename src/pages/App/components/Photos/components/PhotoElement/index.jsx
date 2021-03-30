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
                img={img}
                title={title}
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
        {/*<p className="photoElement__title">{TextAbstract(title, 20)}</p>*/}
        {/*<div className="photoElement__img">*/}
        {/*  <img src={img} alt={title}/>*/}
        {/*</div>*/}
        <img src={img} alt={title}/>
      </div>
    </>
  )
}

export default PhotoElement