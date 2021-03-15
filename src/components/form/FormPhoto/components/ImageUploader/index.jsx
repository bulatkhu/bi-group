import React, {useCallback, useEffect, useState} from 'react'
import BigButton from '../../../../elements/BigButton'
import catalogues from '../../../../../store/modules/catalogue'
import {useController} from 'react-hook-form'
import {reqErrHandler} from '../../../../../helpers/reqErrHandler'

const ImageUploader = ({ open, form }) => {
  const [base64, setBase64] = useState(null)
  const [process, setProcess] = useState(false)
  const { watch, control, handleSubmit, reset } = form

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
  // console.log('image', image)

  useEffect(() => {
    if (image) {
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
      const res = await catalogues.findByImage(formData)
      const result = await catalogues.searchImageByUrl(res.data?.image)
      setProcess(false)
      const sS = JSON.parse(sessionStorage.getItem('results')) || []
      sS.push(result)
      console.log("result", result)
    } catch (e) {
      setProcess(false)
      const err = reqErrHandler(e)
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
      { base64 ? (
        <div className="f-i__wrapUploaded">
          <p className="f-i__imageName">{image?.name}</p>
          <img className="f-i__uploaded" src={base64} alt="uploaded"/>
          <div className="f-i__btnWrap">
            <BigButton
              disabled={process}
              onClick={handleSubmit(onSearchByImage)}
              className="f-i__searchBtn"
            >{process ? "...Loading" : "Search by image"}</BigButton>
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
}

export default ImageUploader