import React, { useEffect } from 'react'
import { view } from '@risingstack/react-easy-state'
import FormPhoto from '../../../../components/form/FormPhoto'
import catalogues from '../../../../store/modules/catalogue'
import Groups from './components/Groups'
import './styles.scss'

const Photos = view(() => {
  useEffect(() => {
    catalogues.fetchCatalog()
  },[])

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
          ? <p>...Loading</p>
          : <Groups />
        }
      </div>
    </main>
  )
})

export default Photos