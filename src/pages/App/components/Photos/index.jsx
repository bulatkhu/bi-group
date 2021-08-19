import React, { useEffect } from 'react'
import { view } from '@risingstack/react-easy-state'
import FormPhoto from '../../../../components/form/FormPhoto'
import catalogues from '../../../../store/modules/catalogue'
import Groups from './components/Groups'
import './styles.scss'
import Loader from '../../../../components/elements/Loader'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

const Photos = view(() => {
  const { search } = useLocation()
  const queryParams = queryString.parse(search)

  useEffect(() => {
    catalogues.getTestImages(null, queryParams)
  }, [queryParams])

  useEffect(() => {
    catalogues.clearModule()
  }, [queryParams?.tags?.length])

  return (
    <main className="photos">
      <div className="photos__searchPhotos">
        <FormPhoto />
      </div>
      <div className="photos__main photosMain">
        <h1 className="photosMain__title">Галерея фотографии</h1>
        {!catalogues.catalogLoaded ? (
          <Loader />
        ) : (
          <>
            <Groups />
          </>
        )}
      </div>
    </main>
  )
})

export default Photos
