const sortObject = (obj) => {
  return Object
    .keys(obj)
    .sort((a, b) => {
      return +a - +b
    })
    .reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {});
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
    return sortObject(sorted)
  } catch (e) {
    console.log('err', e)
    return {}
  }
}

export default sortPhotos