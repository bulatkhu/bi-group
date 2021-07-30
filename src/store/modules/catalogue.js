import { store } from '@risingstack/react-easy-state'
import { get, post } from '../api'
import { reqErrHandler } from '../../helpers/reqErrHandler'
import searching from './searching'
import foundPhotos from './foundPhotos'

const catalogues = store({
  photos: [],
  limit: 25,
  offset: 0,
  catalogLoaded: false,
  prevLink: null,
  nextLink: null,
  imageProgress: 0,
  process: false,
  interval: null,

  requestsCount: 0,
  additionalParams: {},

  clearModule() {
    catalogues.photos = []
    catalogues.catalogLoaded = false
    catalogues.offset = 0
  },

  findByImage(formData) {
    return post('/api/search/upload/', formData)
  },

  async getTestImages(payload = true, additionalParams) {
    try {
      const date = {}
      if (foundPhotos.searchDateStart) {
        date.start_year = new Date(
          foundPhotos.searchDateStart
        ).getFullYear()
        date.start_month =
          new Date(foundPhotos.searchDateStart).getMonth() +
          1
      }
      if (foundPhotos.searchDateEnd) {
        date.end_year = new Date(
          foundPhotos.searchDateEnd
        ).getFullYear()
        date.end_month =
          new Date(foundPhotos.searchDateEnd).getMonth() + 1
      }

      let params = {
        ...date,
        limit: catalogues.limit,
      }

      if (typeof additionalParams === 'object') {
        catalogues.additionalParams = additionalParams
        params = {
          ...params,
          ...catalogues.additionalParams,
        }
      } else if (catalogues.additionalParams) {
        params = {
          ...params,
          ...catalogues.additionalParams,
        }
      }

      if (catalogues.requestsCount === 0) {
        params.offset = catalogues.offset
      } else {
        catalogues.offset =
          catalogues.offset + catalogues.limit
        params.offset = catalogues.offset
      }

      if (searching.chosenTags.length) {
        params.tags = searching.chosenTags
      }

      catalogues.process = true
      const res = await get(`/api/images/`, params)

      catalogues.requestsCount =
        catalogues.requestsCount + 1

      if (payload) {
        catalogues.photos = [
          ...catalogues.photos,
          ...res.data?.results,
        ]
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
    try {
      const { data } = await get(`/api/images/${id}/`)
      return [data, null]
    } catch (e) {
      const err = reqErrHandler(e)
      return [null, err]
    }
  },
})

export default catalogues
