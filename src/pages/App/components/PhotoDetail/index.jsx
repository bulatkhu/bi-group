import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { view } from '@risingstack/react-easy-state'
import catalogues from '../../../../store/modules/catalogue'
import './styles.scss'
import AnimatedDropdownArrow from '../../../../components/elements/AnimatedDropdownArrow'
import Catalog from './components/Catalog'

const PhotoDetail = view(() => {
  const { id } = useParams()
  const history = useHistory()
  const [catalog, setCatalog] = useState(null)
  const [notFound, setNotFound] = useState(null)

  useEffect(() => {
    catalogues.getCatalogById(id)
      .then(c => {
        if (c) {
          setCatalog(c)
        } else {
          setNotFound(true)
        }
      })
      .catch(err => {
        console.log('err', err)
      })
  },[id])

  const makeCatalog = () => {
    if (catalog) {
      return (
        <Catalog catalog={catalog} />
      )
    } else {
      return <p>{ notFound ? "Not found" : "...Loading" }</p>
    }
  }

  return (
    <>
      <div className="p-details__top flex-center">
        <button onClick={() => {
          history.goBack()
        }} className="p-details__goBack">
          <span className="p-details__arrow">
            <AnimatedDropdownArrow />
          </span>
          Go back
        </button>
      </div>
      <div className="p-details">
        {makeCatalog()}
      </div>
    </>
  )
})

export default PhotoDetail