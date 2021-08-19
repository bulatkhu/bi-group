import React, { useState } from 'react'
import clsx from 'clsx'
import UsePortal from '../../../../../../hooks/usePortal'
import ModalOverlay from '../../../../../../components/modals/ModalOverlay'
import PhotoModal from './components/PhotoModal'
import CustomImageFallback from '../../../../../../components/elements/CustomImageFallback'
import classes from './photoElement.module.scss'
import './styles.scss'
import { IconTelegram, IconWhatsapp } from '../../../../../../icons/SVGIcons'

const PhotoElement = ({
  thumbnail: img,
  name: title,
  pk: id,
  year,
  tags,
  isSelected,
  images,
}) => {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const onShowModal = () => {
    setOpen(true)
  }

  const urlToShare = (() => {
    try {
      return encodeURI(images?.[1] || images?.[1] || img)
    } catch (e) {
      return img
    }
  })()

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
      <div style={{ position: 'relative' }}>
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
        <div className={classes.socials}>
          <a
            rel="noreferrer"
            target="_blank"
            href={`https://t.me/share?url=${urlToShare}`}
          >
            <IconTelegram />
          </a>
          <a
            rel="noreferrer"
            target="_blank"
            href={`https://api.whatsapp.com/send?text=${urlToShare}`}
          >
            <IconWhatsapp />
          </a>
        </div>
      </div>
    </>
  )
}

export default PhotoElement
