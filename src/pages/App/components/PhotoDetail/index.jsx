import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { view } from '@risingstack/react-easy-state'
import catalogues from '../../../../store/modules/catalogue'
import './styles.scss'
import BigButton from '../../../../components/elements/BigButton'
import AnimatedDropdownArrow from '../../../../components/elements/AnimatedDropdownArrow'
import ResizeImage from './components/ResizeImage'

const PhotoDetail = view(() => {
  const { id } = useParams()
  const history = useHistory()
  const [catalog, setCatalog] = useState()

  useEffect(() => {
    catalogues.getCatalogById(id)
      .then(c => {
        setCatalog(c)
      })
      .catch(err => {
        console.log('err', err)
      })
  },[id])

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
        {catalog
          ? (
            <div className="p-details__wrapper">
              <h1 className="p-details__title">{catalog?.name}</h1>
              <p className="p-details__date">{catalog?.date?.toLocaleDateString()} год</p>
              <BigButton className="p-details__btn" light>Public button</BigButton>

              <div className="p-details__imgWrapper">
                <button className="p-slider__btn p-slider__next">
                  <AnimatedDropdownArrow />
                </button>

                <button className="p-slider__btn p-slider__prev">
                  <AnimatedDropdownArrow />
                </button>

                <ResizeImage img={catalog?.images} alt={catalog?.name}/>

              </div>
            </div>
          )
          : <p>...Loading</p>
        }
      </div>
    </>
  )
})

export default PhotoDetail