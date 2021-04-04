import React, {useCallback, useEffect, useState} from 'react'
import {view} from '@risingstack/react-easy-state'
import BigButton from '../../../../elements/BigButton'
import {useController, useForm} from 'react-hook-form'
import {reqErrHandler} from '../../../../../helpers/reqErrHandler'
import foundPhotos from '../../../../../store/modules/foundPhotos'
import { useHistory } from 'react-router-dom'
import Loader from '../../../../elements/Loader'

const ImageUploader = view(({ open }) => {
  const [base64, setBase64] = useState(null)
  const [process, setProcess] = useState(false)


  const form = useForm({
    defaultValues: {
      image: '',
    },
  })

  const { watch, control, handleSubmit, reset } = form
  const history = useHistory()

  useEffect(() => {
    if (!open) {
      reset()
      setProcess(false)
      setTimeout(() => setBase64(null), 300)
    }
  }, [open, reset])

  const { field } = useController({
    control,
    name: "image",
  });

  const onImageUpload = useCallback(
    (e) => {
      if (e.target.files.length) {
        field.onChange(e.target.files[0]);
        e.target.value = null;
      }
    },
    [field]
  );

  const image = watch('image', false)

  useEffect(() => {
    if (image) {
      foundPhotos.clearSearching()
      const reader = new FileReader()
      reader.addEventListener('loadend', () => {
        setBase64(reader.result)
      })
      reader.readAsDataURL(image)
    }
  }, [image])

  const onSearchByImage = async data => {
    setProcess(true)
    const formData = new FormData()
    formData.append('image', data.image)

    try {
      const res = await foundPhotos.findByImage(formData)
      const result = await foundPhotos.searchImageByUrl(res.data?.image)
      setProcess(false)
      await foundPhotos.checkWorkerProgress(result.data?.request_id)
      history.push(`/app-found/${result.data?.request_id}`)
    } catch (e) {
      setProcess(false)
      const err = reqErrHandler(e)
      alert(err)
      console.log('err', err)
    }

  }

  return (
    <div className={["f-i", open ? 'active' : null].join(' ')}>
      <input
        onChange={onImageUpload}
        required
        style={{ display: 'none' }}
        name="image"
        id="image"
        type="file"
        accept="image/*"
      />
      <div className="f-i__date">
        {foundPhotos.searchDateStart && (
          <span>Date start: {new Date(foundPhotos.searchDateStart).toLocaleDateString()}</span>
        )}
        {foundPhotos.searchDateEnd && (
          <span>Date end: {new Date(foundPhotos.searchDateEnd).toLocaleDateString()}</span>
        )}
      </div>
      { base64 ? (
        <div className="f-i__wrapUploaded">
          <p className="f-i__imageName">{image?.name}</p>
          {foundPhotos.searching && <Loader text="Searching, just a moment" small />}
          <img className="f-i__uploaded" src={base64} alt="uploaded"/>
          {!foundPhotos.searching && foundPhotos.searchResult && (
            <div style={{ textAlign: "center", marginBottom: 20, }}>
              {foundPhotos.searchResult?.results?.length ? (
                <>
                </>
              ) : (
                <p>Nothing was found</p>
              )}
            </div>
          )}
          <div className="f-i__btnWrap">
            {!foundPhotos.searching && (
              <BigButton
                disabled={process || foundPhotos.searching}
                onClick={handleSubmit(onSearchByImage)}
                className="f-i__searchBtn"
              >{process ? "...Loading" : "Search by image"}</BigButton>
            )}
          </div>
        </div>
      ) : (
        <label htmlFor="image" className="f-i__uploadBox flex-center">

          <div className="f-i__description">

            <BigButton tag="span" light>Choose image(s)</BigButton>
            <p className="f-i__types">Png and jpg only</p>

          </div>

        </label>
      )}
    </div>
  )
})

export default ImageUploader