import { store } from '@risingstack/react-easy-state'
import { get, post } from '../api'
import { reqErrHandler } from '../../helpers/reqErrHandler'

const catalogues = store({
  photos: [],
  limit: 25,
  offset: 25,
  loaded: false,
  prevLink: null,
  nextLink: null,
  imageProgress: 0,

  clearModule() {
    catalogues.photos = []
    catalogues.loaded = false
  },

  searchImageByUrl(url) {
    return post(`/api/search/request/`, {
      image_url: url,
    })
  },

  findByImage(formData) {
    return post('/api/search/upload/', formData)
  },

  async getTestImages(page) {
    try {
      const res = await get(`/api/images/`, {  limit: catalogues.limit, offset: catalogues.offset * page })
      catalogues.photos = res.data?.results
      catalogues.prevLink = res.data?.previous
      catalogues.nextLink = res.data?.next
      catalogues.loaded = true
      return res
    } catch (e) {
      const err = reqErrHandler(e)
      console.log('err', err)
    }
  },

  async getCatalogById(id) {
    if (catalogues.photos.length) {
      return catalogues.photos.find((p) => p.pk === +id)
    } else {
      await catalogues.getTestImages();
      return catalogues.photos.find((p) => p.pk === +id) || {}
    }
  },

  // async fetchCatalog() {
  //   await fakeApi(500)
  //   catalogues.photos = mokePhotos
  //   catalogues.loaded = true
  //   return mokePhotos
  // }
})

export default catalogues