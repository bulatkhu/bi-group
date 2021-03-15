import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import catalogues from '../../../../../../../../store/modules/catalogue'
import { IconClose } from '../../../../../../../../components/Icons'
import BigButton from '../../../../../../../../components/elements/BigButton'
import './styles.scss'
import { TextAbstract } from '../../../../../../../../helpers/textCutter'

const PhotoModal = ({ id, setOpen }) => {
  const history = useHistory()
  const [catalog, setCatalog] = useState({})

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
    <div className="pModal">
      <div className="pModal__img">
        <button
          onClick={() => setOpen(false)}
          className="pModal__close"
        >
          <IconClose/>
        </button>
        <span className="pModal__imgWrap flex-center">
          <img src={catalog?.thumbnail} alt={catalog?.name}/>
         </span>
      </div>
      <div className="pModal__info">
        <h2 className="pModal__title">{TextAbstract(catalog?.name, 30)}</h2>
        <p className="pModal__date">{catalog?.date?.toLocaleDateString()}</p>
      </div>
      <BigButton
        onClick={() => {
          history.push(`/app-catalog/${id}`)
        }}
      >Просмотреть полную информацию</BigButton>
    </div>
  )
}

export default PhotoModal