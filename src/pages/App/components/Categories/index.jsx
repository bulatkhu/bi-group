import React, { useState } from 'react'
import FormPhoto from '../../../../components/form/FormPhoto'
import { view } from '@risingstack/react-easy-state'
import './styles.scss'
import classes from './categories.module.scss'
import CustomSwitcher from '../../../../components/elements/Switcher'
import VideoCatalog from './VideoCatalog'
import PhotoCatalog from './PhotoCatalog'

const Categories = view(() => {
  const [showMovies, setShowMovies] = useState(false)

  return (
    <main className="photos">
      <div className="photos__searchPhotos">
        <FormPhoto />
      </div>
      <div className={classes.switcherWrap}>
        <CustomSwitcher
          label="Показать только видео"
          setShow={setShowMovies}
          value={showMovies}
        />
      </div>
      <div className="photos__main photosMain">
        {showMovies ? <VideoCatalog /> : <PhotoCatalog />}
      </div>
    </main>
  )
})

export default Categories
