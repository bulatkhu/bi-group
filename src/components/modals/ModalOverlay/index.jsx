import React, { useEffect } from 'react'
import { scrollBodyHandler } from '../../../helpers/scrollHandler'
import './styles.scss'

const ModalOverlay = ({
  children,
  center = true,
  setOpen,
}) => {
  useEffect(() => {
    scrollBodyHandler.lock()
    return () => scrollBodyHandler.unLock()
  }, [])

  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget && setOpen) {
      setOpen(false)
    }
  }

  const className = [
    'modal-overlay',
    center ? 'center' : null,
  ].join(' ')
  return (
    <div className={className} onClick={onOverlayClick}>
      {children}
    </div>
  )
}

export default ModalOverlay
