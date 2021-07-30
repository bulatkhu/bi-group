import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { view } from '@risingstack/react-easy-state'
import catalogues from '../../../../store/modules/catalogue'
import './styles.scss'
import AnimatedDropdownArrow from '../../../../components/elements/AnimatedDropdownArrow'
import Catalog from './components/Catalog'
import Loader from '../../../../components/elements/Loader'

const PhotoDetail = view(() => {
  const { id } = useParams()
  const history = useHistory()
  const [catalog, setCatalog] = useState(null)
  const [notFound, setNotFound] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    catalogues.getCatalogById(id).then(([data, err]) => {
      if (err) return setError(err)
      if (!data) return setNotFound(true)

      setCatalog(data)
    })
  }, [id])

  const makeCatalog = () => {
    if (catalog) {
      return <Catalog catalog={catalog} />
    } else {
      return (
        <div>
          {error && <p className="error">Error: {error}</p>}
          <Loader small>
            {notFound
              ? 'Фотография не найденна'
              : 'Загрузка'}
          </Loader>
        </div>
      )
    }
  }

  return (
    <>
      <div className="p-details__top flex-center">
        <button
          onClick={() => {
            history.push('/app-catalogues')
          }}
          className="p-details__goBack"
        >
          <span className="p-details__arrow">
            <AnimatedDropdownArrow />
          </span>
          Назад
        </button>
      </div>
      <div className="p-details">{makeCatalog()}</div>
    </>
  )
})

export default PhotoDetail
