import React, { useState, useEffect } from 'react'
import UsePortal from '../../../hooks/usePortal'
import { useMediaQuery } from 'react-responsive'
import { view } from '@risingstack/react-easy-state'
// import DayPicker from 'react-day-picker'
import SearchIcon from '../../SvgIcons/SearchIcon'
import AnimatedDropdownArrow from '../../elements/AnimatedDropdownArrow'
import { IconUploadImg } from '../../Icons'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './styles.scss'
import { useForm } from 'react-hook-form'
import ImageUploader from './components/ImageUploader'
import SearchResults from './components/SearchResults'
import RangePicker from './components/RangePicker'
import BigButton from '../../elements/BigButton'
import searching from '../../../store/modules/searching'
import { useDebounce } from '../../../hooks/useDebounce'
import { useHistory, useLocation } from 'react-router-dom'
// import foundPhotos from '../../../store/modules/foundPhotos'
import catalogue from '../../../store/modules/catalogue'
import foundPhotos from '../../../store/modules/foundPhotos'
import { format, isValid } from 'date-fns'
import catalogues from '../../../store/modules/catalogue'
import queryString from 'query-string'

const dateFormatter = (date) => format(date, 'MM/dd/yyyy')

const FormPhoto = view(() => {
  const history = useHistory()
  const { search } = useLocation()
  const queryParams = queryString.parse(search)

  const [openValue, setOpenValue] = useState(false)
  const [openDatePicker, setOpenDatePicker] =
    useState(false)
  const [openImgUploader, setOpenImgUploader] =
    useState(false)

  const preMobile = useMediaQuery({
    query: '(max-width: 992px)',
  })

  const form = useForm({
    defaultValues: {
      image: '',
      value: '',
    },
    mode: 'onChange',
  })

  // useEffect(() => {
  //   foundPhotos.getImages();
  // }, [])

  useEffect(() => {
    if (openValue) {
      setOpenDatePicker(false)
      setOpenImgUploader(false)
    } else if (openDatePicker) {
      setOpenValue(false)
      setOpenImgUploader(false)
    } else if (openImgUploader) {
      setOpenValue(false)
      setOpenDatePicker(false)
    }
  }, [openValue, openDatePicker, openImgUploader])

  const closeEveryThing = () => {
    setOpenDatePicker(false)
    setOpenValue(false)
    setOpenImgUploader(false)
  }

  const value = form.watch('value')
  const debouncedValue = useDebounce(value, 500)
  const hasValue = debouncedValue && debouncedValue.trim()

  useEffect(() => {
    if (hasValue) {
      searching.searchByValue(debouncedValue)
    } else {
      searching.clearModule()
    }
  }, [debouncedValue, hasValue])

  const onSearchWithoutAvatar = async () => {
    closeEveryThing()
    history.push('/app-catalogues')
    await catalogue.getTestImages(false)
  }

  const onSearchValue = async () => {
    if (!openValue) {
      setOpenValue(true)
    }

    const { error, message } =
      await searching.searchByImgUrl(searching.chosenAvatar)
    if (error) {
      alert('Что то пошло не так: ' + message)
    } else {
      console.log('success', message)
      closeEveryThing()
      history.push(`/app-found/${message}`)
    }
  }

  const hasRequiredValues =
    searching.chosenTags?.length ||
    (foundPhotos.searchDateStart &&
      foundPhotos.searchDateEnd)

  const { validDateStart, validDateEnd } = {
    validDateStart: isValid(foundPhotos.searchDateStart),
    validDateEnd: isValid(foundPhotos.searchDateEnd),
  }

  return (
    <div className="formPhoto__wrapper">
      <div className="fromPhoto">
        {(openValue ||
          openDatePicker ||
          openImgUploader) && (
          <UsePortal>
            <div
              onClick={closeEveryThing}
              className="fromPhoto__bg"
            />
          </UsePortal>
        )}
        <div className="fromPhoto__wrap">
          <label
            onClick={() => {
              closeEveryThing()
              setOpenValue(true)
            }}
            htmlFor="value"
            className="fromPhoto__el1"
          >
            <SearchIcon />
            <input
              ref={form.register({
                required: true,
              })}
              id="value"
              name="value"
              placeholder={
                !preMobile
                  ? 'Найти по имени или по мероприятию'
                  : 'Искать'
              }
              type="text"
            />
          </label>
          <button
            onClick={() => {
              closeEveryThing()
              setOpenDatePicker((prev) => !prev)
            }}
            className="fromPhoto__el2"
          >
            <div className="datePicker">
              <span className="datePicker__name">
                Выбрать дату
              </span>
              <AnimatedDropdownArrow
                className={openDatePicker ? 'active' : null}
              />
            </div>
          </button>
        </div>
        <button
          onClick={() => {
            closeEveryThing()
            setOpenImgUploader(true)
          }}
          className="fromPhoto__upload"
        >
          <IconUploadImg />
        </button>
        <BigButton
          onClick={
            searching.chosenAvatar
              ? onSearchValue
              : onSearchWithoutAvatar
          }
          disabled={!hasRequiredValues}
          className={[
            'fromPhoto__btn',
            openValue ? 'active' : null,
          ].join(' ')}
        >
          Поиск
        </BigButton>
        <ImageUploader
          form={form}
          open={openImgUploader}
          setOpen={setOpenImgUploader}
        />
        <RangePicker open={openDatePicker} />
        <SearchResults
          hasValue={hasValue}
          form={form}
          open={openValue}
        />
      </div>
      <div className="filters">
        {validDateEnd && validDateStart && (
          <BigButton
            onClick={() => {
              foundPhotos.searchDateEnd = null
              foundPhotos.searchDateStart = null
              catalogues.getTestImages(null, queryParams)
            }}
            className="filters__btn"
          >
            Сбросить дату
          </BigButton>
        )}
        {(validDateEnd || validDateStart) && (
          <div>
            {validDateStart && (
              <p className="filters__date">
                Дата от:{' '}
                <span>
                  {dateFormatter(
                    foundPhotos.searchDateStart
                  )}
                </span>
              </p>
            )}
            {validDateEnd && (
              <p className="filters__date">
                Дата до:{' '}
                <span>
                  {dateFormatter(foundPhotos.searchDateEnd)}
                </span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
})

export default FormPhoto
