import {store} from '@risingstack/react-easy-state'
import {get, post} from '../api'
import {reqErrHandler} from '../../helpers/reqErrHandler'
import searching from './searching'
import foundPhotos from './foundPhotos'

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

  async getTestImages(payload = true) {
    try {
      const date = {}
      if (foundPhotos.searchDateStart) {
        date.start_year = new Date(foundPhotos.searchDateStart).getFullYear()
        date.start_month = new Date(foundPhotos.searchDateStart).getMonth() + 1
      }
      if (foundPhotos.searchDateEnd) {
        date.end_year = new Date(foundPhotos.searchDateEnd).getFullYear()
        date.end_month = new Date(foundPhotos.searchDateEnd).getMonth() + 1
      }

      const params = {
        ...date,
        limit: catalogues.limit,
      }

      if (!payload) {
        catalogues.offsetCount = 0
      }

      params.offset = catalogues.offset * catalogues.offsetCount

      if (searching.chosenTags.length) {
        params.tags = searching.chosenTags
      }

      catalogues.process = true
      const res = await get(`/api/images/`, params)
      catalogues.offsetCount = catalogues.offsetCount + 25

      if (payload) {
        catalogues.photos = [...catalogues.photos, ...res.data?.results]
      } else {
        catalogues.photos = [...res.data?.results]
      }

      catalogues.prevLink = res.data?.previous
      catalogues.nextLink = res.data?.next
      catalogues.catalogLoaded = true
      catalogues.process = false
      return res.data.results
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
