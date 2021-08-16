import React, { useState } from 'react'
import clsx from 'clsx'
import UsePortal from '../../../../../../hooks/usePortal'
import ModalOverlay from '../../../../../../components/modals/ModalOverlay'
import PhotoModal from './components/PhotoModal'
import CustomImageFallback from '../../../../../../components/elements/CustomImageFallback'
import classes from './photoElement.module.scss'
import './styles.scss'

const PhotoElement = ({
  thumbnail: img,
  name: title,
  pk: id,
  year,
  tags,
  isSelected,
}) => {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const onShowModal = () => {
    setOpen(true)
  }

  return (
    <>
      {open && (
        <UsePortal>
          <ModalOverlay setOpen={setOpen}>
            <PhotoModal
              tags={tags}
              year={year}
              img={img}
              title={title}
              setOpen={setOpen}
              id={id}
            />
          </ModalOverlay>
        </UsePortal>
      )}
      <div
        onClick={onShowModal}
        data-id={id}
        className={clsx('photoElement', isSelected && 'photoElement__selected')}
      >
        {/*<p className="photoElement__title">{TextAbstract(title, 20)}</p>*/}
        {/*<div className="photoElement__img">*/}
        {/*  <img src={img} alt={title}/>*/}
        {/*</div>*/}
        {!loaded && <div className={classes.skeleton} />}
        <CustomImageFallback
          className={clsx(classes.img, !loaded && classes.img__hidden)}
          onLoad={() => setLoaded(true)}
          src={img}
          alt={title}
        />
      </div>
    </>
  )
}

export default PhotoElement
