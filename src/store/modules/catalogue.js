import {store} from '@risingstack/react-easy-state'
import {get, post} from '../api'
import {reqErrHandler} from '../../helpers/reqErrHandler'

const catalogues = store({
  photos: [],
  limit: 25,
  offset: 25,
  catalogLoaded: false,
  prevLink: null,
  nextLink: null,
  imageProgress: 0,
  interval: null,
  offsetCount: 0,
  process: false,

  clearModule() {
    catalogues.photos = []
    catalogues.catalogLoaded = false
    catalogues.offsetCount =  0
  },

  findByImage(formData) {
    return post('/api/search/upload/', formData)
  },

  async getTestImages() {
    try {
      catalogues.process = true
      const res = await get(`/api/images/`, {  limit: catalogues.limit, offset: catalogues.offset * catalogues.offsetCount })
      catalogues.offsetCount = catalogues.offsetCount + 25
      catalogues.photos = [...catalogues.photos, ...res.data?.results]
      catalogues.prevLink = res.data?.previous
      catalogues.nextLink = res.data?.next
      catalogues.catalogLoaded = true
      catalogues.process = false
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
      return catalogues.photos.find((p) => p.pk === +id)
    }
  },
})

export default catalogues