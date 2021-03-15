import { store } from '@risingstack/react-easy-state'
import { get, post } from '../api'
import { reqErrHandler } from '../../helpers/reqErrHandler'

const catalogues = store({
  photos: [],
  loaded: false,

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

  async getTestImages() {
    try {
      const res = await get(`/api/images/`)
      catalogues.photos = res.data?.results
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