import React, { useEffect } from 'react'
import FormPhoto from '../../../../components/form/FormPhoto'
import { view } from '@risingstack/react-easy-state'
import catalogPreview from '../../../../store/modules/catalogPreview'

const Categories = view(() => {

  useEffect(() => {

    catalogPreview.getCatalogPreview();

  }, []);

  console.log("catalog", catalogPreview.catalog[0]);

  const catalogs = (catalogPreview.catalog[0] && catalogPreview.catalog[0]?.length) || [
    { img: "https://test-api-media.bi.group/media/64b6fbd9cc9c4f8fbd8640054f51bac0.jpg" },
    { img: "https://test-api-media.bi.group/media/64b6fbd9cc9c4f8fbd8640054f51bac0.jpg" },
    { img: "https://test-api-media.bi.group/media/64b6fbd9cc9c4f8fbd8640054f51bac0.jpg" },
    { img: "https://test-api-media.bi.group/media/64b6fbd9cc9c4f8fbd8640054f51bac0.jpg" },
  ];


  return (

    <main className="photos">
      <div className="photos__searchPhotos">
        <FormPhoto />
      </div>
      <div className="photos__main photosMain">

        <div className="categories photosMain__masonry">
          {catalogs.map((catalog, index) => {
            return <div key={index} className="photoElement">
              <img src={catalog.img} alt=""/>
            </div>
          })}
        </div>

      </div>
    </main>
  )
});

export default Categories;
