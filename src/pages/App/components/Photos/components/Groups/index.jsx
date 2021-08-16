import React, { useState } from 'react'
import { view } from '@risingstack/react-easy-state'
import PhotoElement from '../PhotoElement'
import catalogues from '../../../../../../store/modules/catalogue'
import sortPhotos from '../../../../../../helpers/sortPhotos'
import InfiniteLoader from 'react-infinite-loader/lib/InfiniteLoader'
import Loader from '../../../../../../components/elements/Loader'
import UsePortal from '../../../../../../hooks/usePortal'
import BigButton from '../../../../../../components/elements/BigButton'
import classes from './groups.module.scss'
import clsx from 'clsx'
import { IconCheckMark } from '../../../../../../components/Icons'
import downloadImage from '../../../../../../helpers/downloadImage'

const downloadImages = (images) =>
  images.forEach(([img, name]) => downloadImage(img, name))

const Groups = view(() => {
  const hasPhotos = catalogues.photos.length

  const [selected, setSelected] = useState([])

  const makePhotos = () => {
    if (hasPhotos) {
      const sortedPhotos = sortPhotos(catalogues.photos)

      return (
        <>
          {!!selected.length && (
            <UsePortal>
              <div className={classes.downloadBtn}>
                <BigButton
                  onClick={() => {
                    downloadImages(selected)
                    console.log('selected', selected)
                  }}
                >
                  Скачать {selected.length === 1 ? '' : `все ${selected.length}`}
                </BigButton>
                <BigButton className={classes.smallBtn} onClick={() => setSelected([])}>
                  Сбросить
                </BigButton>
              </div>
            </UsePortal>
          )}
          {sortedPhotos.map(({ year, photos: photosByTags }, index) => {
            return (
              <div key={index}>
                <p className="photosMain__date">{year} год</p>
                <>
                  {Object.keys(photosByTags).map((photoTag, index) => {
                    const photos = photosByTags[photoTag]

                    return (
                      <div key={index} className="photosMain-photo">
                        <div className="photosMain-photo__tagWrapper">
                          <span className="photosMain-photo__tag">
                            Тег:{' '}
                            <span>{photoTag === 'noTag' ? 'Без тега' : photoTag}</span>
                          </span>
                        </div>
                        <div className="photosMain__masonry">
                          {photos.map((photo, index) => {
                            const candidateURL =
                              photo.images[0] || photo.images[1] || photo.thumbnail

                            const isSelected = selected.find(
                              (item) => item[0] === candidateURL
                            )

                            return (
                              <div className={classes.photoWrapper} key={index}>
                                <PhotoElement {...photo} isSelected={isSelected} />
                                <button
                                  className={clsx(
                                    classes.selectBtn,
                                    isSelected && classes.selectBtn__selected
                                  )}
                                  onClick={() =>
                                    setSelected((prev) => {
                                      if (prev.find((item) => item[0] === candidateURL)) {
                                        return prev.filter(
                                          (item) => item[0] !== candidateURL
                                        )
                                      } else {
                                        return [...prev, [candidateURL, photo.name]]
                                      }
                                    })
                                  }
                                >
                                  {isSelected && (
                                    <IconCheckMark
                                      className={clsx(
                                        classes.checkMark,
                                        classes.checkMark__selected
                                      )}
                                    />
                                  )}
                                </button>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </>
                {catalogues.process ? (
                  <Loader />
                ) : catalogues.error ? (
                  <p className="error">{catalogues.error}</p>
                ) : hasPhotos && catalogues.nextLink ? (
                  <InfiniteLoader onVisited={() => catalogues.getTestImages()} />
                ) : (
                  <p>Фотографий больше нет</p>
                )}
              </div>
            )
          })}
        </>
      )
    } else {
      return <p>No photo</p>
    }
  }

  return <>{makePhotos()}</>
})

export default Groups
