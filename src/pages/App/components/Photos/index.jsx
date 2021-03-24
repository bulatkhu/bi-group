import React, { useEffect } from 'react'
import { view } from '@risingstack/react-easy-state'
import { useParams } from 'react-router-dom'
import FormPhoto from '../../../../components/form/FormPhoto'
import catalogues from '../../../../store/modules/catalogue'
import Groups from './components/Groups'
import './styles.scss'
import Loader from '../../../../components/elements/Loader'
import Pagination from './components/Pagination'

const Photos = view(() => {
  const params = useParams()

  useEffect(() => {
    catalogues.getTestImages(params.page || 0)
  }, [params.page])

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
            <Pagination page={params.page || 0}/>
          </>}
      </div>
    </main>
  )
})

export default Photos