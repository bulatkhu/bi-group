import React, { useEffect } from 'react'
import { view } from '@risingstack/react-easy-state'
import FormPhoto from '../../../../components/form/FormPhoto'
import catalogues from '../../../../store/modules/catalogue'
import Groups from './components/Groups'
import './styles.scss'
import Loader from '../../../../components/elements/Loader'

const Photos = view(() => {
  useEffect(() => {
    catalogues.getTestImages(true)
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
        {!catalogues.catalogLoaded
          ? <Loader />
          : <>
            <Groups/>
          </>}
      </div>
    </main>
  )
})

export default Photos
