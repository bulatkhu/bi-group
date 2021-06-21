import React, { useEffect } from 'react'
import FormPhoto from '../../../../components/form/FormPhoto'
import { view } from '@risingstack/react-easy-state'
import catalogPreview from '../../../../store/modules/catalogPreview'
import "./styles.scss"
import CategoryItem from './CategoryItem'

const Categories = view(() => {
  useEffect(() => {
    catalogPreview.getCatalogPreview();
  }, []);

  return (

    <main className="photos">
      <div className="photos__searchPhotos">
        <FormPhoto />
      </div>
      <div className="photos__main photosMain">

        {
          catalogPreview.catalog[1]
          ? <p className="error">{catalogPreview.catalog[1]}</p>
          : catalogPreview.catalog[0]
              ? <div className="categories">
                {catalogPreview.catalog[0].map(({ tags, image_url, name }, index) => {
                  const queryTags = tags.map(({pk}) => "tags=" + pk).join("&");

                  return (
                    <CategoryItem
                      key={index}
                      queryTags={queryTags}
                      img={image_url}
                      name={name}
                      tags={tags}
                    />
                  )
                })}
              </div>
              : <p>{catalogPreview.loading ? "Загрузка" : "Группы фотографий не найденны"}</p>
        }

      </div>
    </main>
  )
});

export default Categories;
