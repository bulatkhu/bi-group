import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import catalogues from '../../../../../../../../store/modules/catalogue'
import { IconClose } from '../../../../../../../../components/Icons'
import BigButton from '../../../../../../../../components/elements/BigButton'
import './styles.scss'

const PhotoModal = ({ id, setOpen }) => {
  const history = useHistory()
  const [catalog, setCatalog] = useState({})

  useEffect(() => {
    const getCatalogAsync = async () => {
      const c = await catalogues.getCatalogById(id)
      console.log('catalog', c)
      setCatalog(c)
    }
    getCatalogAsync()
  },[id])

  return (
    <div className="pModal">
      <div className="pModal__img">
        <button
          onClick={() => setOpen(false)}
          className="pModal__close"
        >
          <IconClose/>
        </button>
        <span className="pModal__imgWrap flex-center">
          <img src={catalog?.img} alt={catalog?.title}/>
         </span>
      </div>
      <h2 className="pModal__title">{catalog?.title}</h2>
      <BigButton
        onClick={() => {
          history.push(`/app-catalog/${id}`)
        }}
      >Просмотреть полную информацию</BigButton>
    </div>
  )
}

export default PhotoModal