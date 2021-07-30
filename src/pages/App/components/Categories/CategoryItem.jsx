import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { Link } from 'react-router-dom'

const CategoryItem = ({ queryTags, img, tags, name }) => {
  const refImgHeight = useRef(null)

  const [imgHeight, setImgHeight] = useState()

  const updateSize = () =>
    setImgHeight(refImgHeight.current.height)

  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize)

    return () =>
      window.removeEventListener('resize', updateSize)
  }, [refImgHeight.current?.height])

  useEffect(() => {
    updateSize()
  }, [])

  const style = {}

  if (imgHeight) {
    style.top = imgHeight
    style.transform = 'translateY(-100%)'
  }

  return (
    <Link
      to={`/app-catalogues?${queryTags}`}
      className="photoElement categories-photo-item"
    >
      <div
        style={style}
        className="categories-photo-item__info"
      >
        <p className="categories-photo-item__text">
          <span>{name}</span>
        </p>
        <p className="categories-photo-item__tag">
          {tags.map(({ name }) => name).join(', ')}
        </p>
      </div>

      <img ref={refImgHeight} src={img} alt="tag" />
    </Link>
  )
}

export default CategoryItem
