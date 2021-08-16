type IDownloadImage = (
  img: string,
  name: string
) => Promise<[null | boolean, null | string]>

const downloadImage: IDownloadImage = async (img, name) => {
  try {
    const image = await fetch(img)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)

    const link = document.createElement('a')
    link.href = imageURL
    link.download = name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    return [true, null]
  } catch (e) {
    console.log('error', e.message)
    return [null, e.message]
  }
}

export default downloadImage
