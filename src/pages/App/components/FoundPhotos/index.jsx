import React, { useEffect } from 'react'
import { view } from '@risingstack/react-easy-state'
import { useParams } from 'react-router-dom'
import FormPhoto from '../../../../components/form/FormPhoto'
import Groups from './components/Groups'
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
          Найденные фотографий
        </h1>

        <div style={{ height: 10 }} />
        {
          foundPhotos.searching
            ? <Loader small text="Searching..." />
            : <Groups />
        }
      </div>
    </main>
  )
})

export default FoundPhotos