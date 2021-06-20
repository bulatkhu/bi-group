import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import FormPhoto from '../../../../components/form/FormPhoto'
import { view } from '@risingstack/react-easy-state'
import catalogPreview from '../../../../store/modules/catalogPreview'
import "./styles.scss"

const Categories = view(() => {
  useEffect(() => {
    catalogPreview.getCatalogPreview();
  }, []);

  const catalogs = (catalogPreview.catalog[0] && catalogPreview.catalog[0]?.length) || [
    { tags: [{pk: 11, name: "Май"},{pk: 13, name: "Июль"}], img: "https://test-api-media.bi.group/media/64b6fbd9cc9c4f8fbd8640054f51bac0.jpg" },
    { tags: [{pk: 13, name: "Июль"}], img: "https://test-api-media.bi.group/media/64b6fbd9cc9c4f8fbd8640054f51bac0.jpg" },
    { tags: [{pk: 12, name: "Июнь"}], img: "https://test-api-media.bi.group/media/64b6fbd9cc9c4f8fbd8640054f51bac0.jpg" },
    { tags: [{pk: 18, name: "Декабрь"}], img: "https://test-api-media.bi.group/media/64b6fbd9cc9c4f8fbd8640054f51bac0.jpg" },
  ];

  return (

    <main className="photos">
      <div className="photos__searchPhotos">
        <FormPhoto />
      </div>
      <div className="photos__main photosMain">

        <div className="categories photosMain__masonry">
          {catalogs.map(({ tags, img }, index) => {
            const queryTags = tags.map(({pk}) => "tags=" + pk).join("&");

            return (
              <Link to={`/app-catalogues?${queryTags}`} key={index} className="photoElement categories-photo-item">
                <div className="categories-photo-item__info">
                  <p className="categories-photo-item__text"><span>123123123</span></p>
                  <p className="categories-photo-item__tag">{tags.map(({name}) => name).join(', ')}</p>
                </div>

                <img src={img} alt="tag"/>
              </Link>
            )
          })}
        </div>

      </div>
    </main>
  )
});

export default Categories;
