import React, { useEffect } from 'react'
import { view } from '@risingstack/react-easy-state'
import { useParams } from 'react-router-dom'
import FormPhoto from '../../../../components/form/FormPhoto'
import Groups from './components/Groups'
import './styles.scss'
import Loader from '../../../../components/elements/Loader'
import foundPhotos from '../../../../store/modules/foundPhotos'

const FoundPhotos = view(() => {
  const params = useParams()

  useEffect(() => {
    if (!foundPhotos.searching) {
      foundPhotos.checkWorkerProgress(params?.request_id)
    }
  }, [params])

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
          foundPhotos.searching
            ? <Loader text="Searching..." />
            : <Groups />
        }
      </div>
    </main>
  )
})

export default FoundPhotos