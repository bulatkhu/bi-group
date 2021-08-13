import React, { useEffect } from 'react'
import classes from './photoCatalog.module.scss'
import catalogPreview from '../../../../../store/modules/catalogPreview'
import CategoryItem from '../CategoryItem'
import { view } from '@risingstack/react-easy-state'

const PhotoCatalog = view(() => {
  useEffect(() => {
    catalogPreview.getCatalogPreview()
  }, [])

  return (
    <div className={classes.root}>
      {catalogPreview.catalog[1] ? (
        <p className="error">{catalogPreview.catalog[1]}</p>
      ) : catalogPreview.catalog[0] ? (
        <div className="categories">
          {catalogPreview.catalog[0].map(
            ({ tags, image_url, name }, index) => {
              const queryTags = tags
                .map(({ pk }) => 'tags=' + pk)
                .join('&')

              return (
                <CategoryItem
                  key={index}
                  queryTags={queryTags}
                  img={image_url}
                  name={name}
                  tags={tags}
                />
              )
            }
          )}
        </div>
      ) : (
        <p>
          {catalogPreview.loading
            ? 'Загрузка'
            : 'Группы фотографий не найденны'}
        </p>
      )}
    </div>
  )
})

export default PhotoCatalog
