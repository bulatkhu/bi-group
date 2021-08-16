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
  photos.forEach((photo) => {
    photo.tags.forEach(({ name }) =>
      allTagsSetter.add(name)
    )
  })
  return Array.from(allTagsSetter)
}

const sortPhotos = (photos) => {
  if (!photos || !photos?.length) return {}
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
        noTag: [],
      }
      const photos = sortedPhotos[key]

      const allTags = getAllUniqueTagsByPhotoGroup(photos)

      allTags.forEach((tag) => {
        photosByTags[tag] = []
      })

      photos.forEach((photo) => {
        if (photo.tags.length) {
          return photo.tags.forEach(({ name }) => {
            if (photosByTags.hasOwnProperty(name)) {
              photosByTags[name].push(photo)
            }
          })
        }

        photosByTags.noTag.push(photo)
      })

      return {
        year: key,
        photos: photosByTags,
      }
    })
  } catch (e) {
    console.log('err', e)
    return []
  }
}

export default sortPhotos
