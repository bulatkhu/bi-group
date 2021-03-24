import React, { useEffect } from 'react'
import { view } from '@risingstack/react-easy-state'
import { useParams } from 'react-router-dom'
import FormPhoto from '../../../../components/form/FormPhoto'
import catalogues from '../../../../store/modules/catalogue'
import Groups from './components/Groups'
import './styles.scss'
import Loader from '../../../../components/elements/Loader'
import Pagination from './components/Pagination'

const Photos = view((props) => {
  const params = useParams()

  console.log('props', props.state)

  useEffect(() => {
    if (props.state?.found) {
      catalogues.getTestImages(params.page || 0)
    } else if (!props.state?.found) {
      catalogues.getTestImages(params.page || 0)
    }
  }, [params.page, props.state])


  const makeGroups = () => {
    if (props.state?.found) {
      return catalogues.searchResLoaded
        ? <Loader />
        : <Groups found />
    } else {
      return !catalogues.catalogLoaded
        ? <Loader />
        : <>
            <Groups/>
            <Pagination page={params.page || 0}/>
          </>
    }
  }

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
        {makeGroups()}

      </div>
    </main>
  )
})

export default Photos