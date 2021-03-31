import React from 'react'
import { useHistory } from 'react-router-dom'
import { IconClose } from '../../../../../../../../components/Icons'
import BigButton from '../../../../../../../../components/elements/BigButton'
import { TextAbstract } from '../../../../../../../../helpers/textCutter'
import './styles.scss'

const PhotoModal = ({ id, setOpen, img, title, ...rest }) => {
  const history = useHistory()

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
          <img src={img} alt={title}/>
         </span>
      </div>
      <div className="pModal__info">
        <h2 className="pModal__title">{TextAbstract(title, 30)}</h2>
        <p className="pModal__date">{title.date?.toLocaleDateString()}</p>
      </div>
      <BigButton
        onClick={() => {
          history.push({
            pathname: `/app-catalog/${id}`,
            state: { img, title, ...rest }
          })
        }}
      >Просмотреть полную информацию</BigButton>
    </div>
  )
}

export default PhotoModal