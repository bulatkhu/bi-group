const sortObject = (obj) => {
  return Object.keys(obj)
    .sort((a, b) => {
      return +a - +b
    })
    .reduce((result, key) => {
      result[key] = obj[key]
      return result
    }, {})
}

const getAllUniqueTagsByPhotoGroup = (photos) => {
  const allTagsSetter = new Set()

  allTagsSetter.add('no_tag')

  photos.forEach((photo) => {
    photo.tags.forEach(({ name }) =>
      allTagsSetter.add(name)
    )
  })
  // allTagsSetter.forEach(tag => allTags.push(tag));

  return Array.from(allTagsSetter)
}

const sortPhotos = (photos) => {
  if (!photos || !photos?.length) return {}

  console.log('photos', photos)

  const sorted = {}
  try {
    photos.forEach((photo) => {
      if (photo.year in sorted) {
        sorted[photo.year] = [...sorted[photo.year], photo]
      } else {
        sorted[photo.year] = [photo]
      }
    })

    const sortedPhotos = sortObject(sorted)

    return Object.keys(sortedPhotos).map((key) => {
      const photosByTags = {
        no_tag: [],
      }
      const photos = sortedPhotos[key]

      const allTags = getAllUniqueTagsByPhotoGroup(photos)

      allTags.forEach((tag) => {
        photosByTags[tag] = []
      })

      photos.forEach((photo) => {
        photo.tags.forEach(({ name }) => {
          if (photosByTags.hasOwnProperty(name)) {
            photosByTags[name].push(photo)
          }
        })
      })

      return {
        year: key,
        photos: photosByTags,
      }
    })
  } catch (e) {
    console.log('err', e)
    return {}
  }
}

export default sortPhotos
