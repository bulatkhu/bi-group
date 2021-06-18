import React, { useState } from 'react'
import UsePortal from '../../../../../../hooks/usePortal'
import ModalOverlay from '../../../../../../components/modals/ModalOverlay'
import PhotoModal from '../../../Photos/components/PhotoElement/components/PhotoModal'

const PhotoElement = ({ img, title, id, tags }) => {
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
                img={img}
                title={title}
                id={id}
                tags={tags}

                btn={false}
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
        <img src={img} alt={title}/>
      </div>
    </>
  )
}

export default PhotoElement
