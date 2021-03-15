import React, { useEffect, useRef } from 'react'
import { view } from '@risingstack/react-easy-state'
import FormPhoto from '../../../../components/form/FormPhoto'
import catalogues from '../../../../store/modules/catalogue'
import Groups from './components/Groups'
import './styles.scss'
import Loader from '../../../../components/elements/Loader'

const Photos = view(() => {
  const init = useRef(false)

  useEffect(() => {
    if (!init.current && !catalogues.photos?.length) {
      catalogues.getTestImages()
      init.current = true
    }
    console.log('rerender')
  }, [])


  return (
    <main className="photos">
      <div className="photos__searchPhotos">
        <FormPhoto />
      </div>
      <div className="photos__main photosMain">
        <h1 className="photosMain__title">
          Галерея фотографий
        </h1>

        <p className="photosMain__date">2013 год</p>
        {
          !catalogues.loaded
          ? <Loader />
          : <Groups />
        }
      </div>
    </main>
  )
})

export default Photos